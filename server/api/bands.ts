import { useRuntimeConfig } from "#imports";

interface Band {
  location: string;
  time: string | null;
  bandPhoto: string;
  bandName: string;
  website: string | null;
  video: string | null;
  description: string;
  lookupName: string;
}

function transformGoogleDriveUrl(url: string, baseUrl: string): string {
  if (url && url.includes("drive.google.com/open?id=")) {
    const fileIdMatch = url.match(/id=([^&]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }
  return baseUrl + url;
}

function transformYoutubeUrl(url: string): string {
  if (!url) return url;

  const youtubeRegExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(youtubeRegExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}`;
  }

  return url;
}

const SPREADSHEET_ID = "1o2a1B9ystatYWXl4QgJo5ukDlu2ibPFqf7McJuF27uU";

export default defineEventHandler(async (): Promise<Record<string, Band[]>> => {
  const config = useRuntimeConfig();
  const API_KEY = config.googleSheetsApiKey;
  const baseUrl = config.public.clientUrl || "http://localhost:3000";

  if (!API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: "GOOGLE_SHEETS_API_KEY is not configured",
    });
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Antwoorden!A:Z?key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { values: (string | number)[][] };
    const rows = data.values;

    if (!rows || rows.length === 0) {
      throw createError({
        statusCode: 500,
        statusMessage: "No data returned from Google Sheets API",
      });
    }

    const headers = rows[0] as string[];
    const byYear: Record<string, Band[]> = {};

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowData: Record<string, string> = {};

      headers.forEach((header, index) => {
        rowData[header] = String(row[index] || "");
      });

      if (!rowData["Jaar"] && !rowData["Naam"]) {
        continue;
      }

      const year = rowData["Jaar"]?.trim() || "";
      const name = rowData["Naam"]?.trim() || "";

      const lookupName = name
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      const band: Band = {
        location: rowData["Plaats"]?.trim() || "",
        time: rowData["Tijdstip"]?.trim() || null,
        bandPhoto: transformGoogleDriveUrl(
          rowData["Foto"]?.trim() || "",
          baseUrl,
        ),
        bandName: name,
        website: rowData["URL Website"]?.trim() || null,
        video: transformYoutubeUrl(
          rowData["URL Youtube filmpje"]?.trim() || null,
        ),
        description: rowData["Beschrijving"]?.trim() || "",
        lookupName,
      };

      if (!byYear[year]) byYear[year] = [];
      byYear[year].push(band);
    }

    return byYear;
  } catch (error) {
    console.error("Error fetching data from Google Sheets API:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch bands data",
      cause: error,
    });
  }
});
