<template>
  <ClientOnly>
    <section class="relative mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <!-- Title section with gradient background -->
      <div class="mb-12 text-center md:mb-16">
        <div class="relative inline-block">
          <h2
            class="relative mb-3 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Waar Gaat Het Gebeuren?
          </h2>
        </div>
        <p class="mt-4 text-lg text-gray-300/90 md:text-xl">
          Ontdek alle locaties waar bands optreden
        </p>
      </div>

      <!-- Loading state with spinner -->
      <div
        v-if="isLoading"
        class="flex min-h-[500px] items-center justify-center"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#bc2b26]"
          ></div>
          <p class="text-lg text-gray-300">Kaart laden...</p>
        </div>
      </div>

      <!-- Error state with better styling -->
      <div
        v-else-if="hasError"
        class="flex min-h-[500px] items-center justify-center"
      >
        <div
          class="rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center backdrop-blur-sm"
        >
          <svg
            class="mx-auto mb-4 h-12 w-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-lg text-red-300">
            Er is een probleem opgetreden bij het laden van de kaart.
          </p>
        </div>
      </div>

      <!-- Map container with enhanced styling -->
      <div v-else class="relative mx-auto max-w-7xl">
        <!-- Map wrapper with shadow and border -->
        <div
          class="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/30 shadow-2xl backdrop-blur-sm"
        >
          <div
            ref="mapContainer"
            class="h-[500px] w-full md:h-[650px] lg:h-[700px]"
          />
        </div>
      </div>
    </section>
  </ClientOnly>
</template>

<script setup>
import { locationCoordinates } from "~/data/locations";

let L = null;

const mapContainer = ref(null);
const map = ref(null);
const isLoading = ref(true);
const hasError = ref(false);
const bandsByLocation = ref({});
const userLocationMarker = ref(null);
const userAccuracyCircle = ref(null); // Add accuracy circle
const watchId = ref(null); // Track the geolocation watch
const isTracking = ref(false); // Track if location tracking is active

onMounted(async () => {
  // Dynamically import Leaflet on client side only
  L = (await import("leaflet")).default;

  // Create custom marker icon with #bc2b26 color
  const customIcon = L.divIcon({
    html: `
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.71578 0 1 6.71578 1 15C1 24 16 40 16 40S31 24 31 15C31 6.71578 24.2842 0 16 0Z" fill="#bc2b26"/>
        <circle cx="16" cy="14" r="4" fill="white"/>
      </svg>
    `,
    className: "custom-marker",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });

  // Function to update user location on map
  const updateUserLocation = (latitude, longitude, accuracy) => {
    // Remove previous markers if they exist
    if (userLocationMarker.value) {
      map.value.removeLayer(userLocationMarker.value);
    }
    if (userAccuracyCircle.value) {
      map.value.removeLayer(userAccuracyCircle.value);
    }

    // Add accuracy circle
    userAccuracyCircle.value = L.circle([latitude, longitude], {
      radius: accuracy,
      fillColor: "#bc2b26",
      fillOpacity: 0.1,
      color: "#bc2b26",
      weight: 1,
      opacity: 0.3,
    }).addTo(map.value);

    // Add user location marker with pulsing effect
    userLocationMarker.value = L.circleMarker([latitude, longitude], {
      radius: 10,
      fillColor: "#bc2b26",
      color: "#fff",
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9,
      className: "user-location-marker", // For pulsing animation
    }).addTo(map.value);

    // Add a popup to show this is the user's location
    userLocationMarker.value.bindPopup(
      `<div style="text-align: center; padding: 8px;">
        <strong style="color: #bc2b26;">Uw locatie</strong>
        <div style="font-size: 12px; color: #666; margin-top: 4px;">
          Nauwkeurigheid: ±${Math.round(accuracy)}m
        </div>
      </div>`,
      { className: "user-location-popup" },
    );
  };

  // Create custom locate control
  const LocateControl = L.Control.extend({
    onAdd() {
      const container = L.DomUtil.create("div", "leaflet-control-locate");
      const button = L.DomUtil.create("a", "", container);
      button.href = "#";
      button.title = "Volg mijn locatie";
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="false" role="img"><title>Volg mijn locatie</title><circle cx="12" cy="12" r="8"></circle><circle cx="12" cy="12" r="3" fill="currentColor"></circle><path d="M21 12h-2"></path><path d="M5 12H3"></path><path d="M12 3v2"></path><path d="M12 21v-2"></path></svg>`;

      L.DomEvent.on(button, "click", (e) => {
        L.DomEvent.preventDefault(e);
        L.DomEvent.stopPropagation(e);

        if (!navigator.geolocation) {
          alert("Geolocatie wordt niet ondersteund door uw browser.");
          return;
        }

        // Toggle tracking on/off
        if (isTracking.value) {
          // Stop tracking
          if (watchId.value !== null) {
            navigator.geolocation.clearWatch(watchId.value);
            watchId.value = null;
          }

          // Remove markers
          if (userLocationMarker.value) {
            map.value.removeLayer(userLocationMarker.value);
            userLocationMarker.value = null;
          }
          if (userAccuracyCircle.value) {
            map.value.removeLayer(userAccuracyCircle.value);
            userAccuracyCircle.value = null;
          }

          isTracking.value = false;
          button.style.backgroundColor = "white";
          button.style.color = "#bc2b26";
          button.title = "Volg mijn locatie";
        } else {
          // Start tracking
          button.style.opacity = "0.5";

          watchId.value = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude, accuracy } = position.coords;

              // Update location on map
              updateUserLocation(latitude, longitude, accuracy);

              // Only auto-center on first location or if user is far from current view
              if (!isTracking.value) {
                map.value.setView([latitude, longitude], 16);
              }

              isTracking.value = true;
              button.style.opacity = "1";
              button.style.backgroundColor = "#bc2b26";
              button.style.color = "white";
              button.title = "Stop locatie volgen";
            },
            (error) => {
              console.error("Geolocation error:", error);
              let errorMessage = "Kon locatie niet bepalen.";

              if (error.code === error.PERMISSION_DENIED) {
                errorMessage =
                  "Locatietoegang geweigerd. Schakel locatieservices in.";
              } else if (error.code === error.POSITION_UNAVAILABLE) {
                errorMessage = "Locatie-informatie is niet beschikbaar.";
              } else if (error.code === error.TIMEOUT) {
                errorMessage = "Locatieverzoek duurde te lang.";
              }

              alert(errorMessage);
              button.style.opacity = "1";
              isTracking.value = false;
            },
            {
              enableHighAccuracy: true, // Use GPS for better accuracy
              timeout: 10000, // 10 second timeout
              maximumAge: 0, // Don't use cached position
            },
          );
        }
      });

      return container;
    },
  });

  try {
    // Fetch bands data
    const bandsData = await $fetch("/api/bands");

    // Get the latest year (should be 2025)
    const years = Object.keys(bandsData).sort().reverse();
    const latestYear = years[0];
    const currentYearBands = bandsData[latestYear] || [];

    // Group bands by location
    const grouped = {};
    currentYearBands.forEach((band) => {
      if (!grouped[band.location]) {
        grouped[band.location] = [];
      }
      grouped[band.location].push(band);
    });

    bandsByLocation.value = grouped;

    // Set isLoading to false BEFORE initializing map to ensure DOM is rendered
    isLoading.value = false;

    // Initialize map on next tick to ensure DOM is ready
    await nextTick();

    // Create map centered on Izegem
    map.value = L.map(mapContainer.value).setView(
      [50.92013753067656, 3.215729371811189],
      16,
    );

    // Add CartoDB dark tiles for better contrast
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      },
    ).addTo(map.value);

    // Add custom locate control
    new LocateControl({ position: "topright" }).addTo(map.value);

    // Add markers for each location
    Object.entries(grouped).forEach(([locationName, bands]) => {
      const coords = locationCoordinates[locationName.toLowerCase()];
      if (coords) {
        const bandPhotos = bands
          .filter((b) => b.bandPhoto)
          .map(
            (b) =>
              `<img src="${b.bandPhoto}" alt="${b.bandName}" style="width:100%; margin-bottom:12px; max-height:10vh; object-fit:cover;">`,
          )
          .join("");

        const bandNames = bands
          .map(
            (b) =>
              `<div style="margin-bottom: 10px; padding: 8px; border-radius: 6px;">
                <strong style="color: #bc2b26; font-size: 15px;">${b.bandName}</strong>
                ${b.time ? `<div style="color: #666; font-size: 13px; margin-top: 2px;">${b.time}</div>` : ""}
              </div>`,
          )
          .join("");

        const markerPopup = `
  <div style="min-width: 240px; max-width: 280px; font-family: system-ui, -apple-system, sans-serif;">
    ${bandPhotos}
    <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: bold; color: #1a1a1a; border-bottom: 2px solid #bc2b26; padding: 8px;">
       ${locationName}
    </h3>
    <div style="font-size: 13px; color: #333; margin-bottom: 12px;">
      ${bandNames}
    </div>
    <a href="/programma/${bands[0].lookupName}" 
       style="display: block; padding: 8px 16px; background: #bc2b26; color: white; 
              text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 6px;
              transition: all 0.2s; box-shadow: 0 2px 4px rgba(188, 43, 38, 0.3); margin: 8px; margin-top: 0; text-align: center;">
      Meer informatie
    </a>
  </div>
`;

        const marker = L.marker([coords.latitude, coords.longitude], {
          icon: customIcon,
        })
          .bindPopup(markerPopup, {
            maxWidth: 350,
            className: "custom-popup",
          })
          .addTo(map.value);

        // Center map when popup opens
        marker.on("popupopen", function (e) {
          const px = map.value.project(e.target.getLatLng());
          px.y -= e.target.getPopup()._container.clientHeight / 2;
          map.value.panTo(map.value.unproject(px), { animate: true });
        });
      }
    });

    isLoading.value = false;
  } catch (error) {
    console.error("Error loading bands:", error);
    hasError.value = true;
    isLoading.value = false;
  }
});

// Cleanup on unmount
onUnmounted(() => {
  // Stop watching location
  if (watchId.value !== null) {
    navigator.geolocation.clearWatch(watchId.value);
  }

  if (map.value) {
    map.value.remove();
  }
});
</script>

<style scoped>
:deep(.leaflet-control-attribution) {
  display: none;
}

:deep(.leaflet-container) {
  font: inherit;
  background: #1a1a1a;
}

:deep(.custom-marker) {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  transition: transform 0.2s ease;
}

:deep(.custom-marker:hover) {
  transform: translateY(-2px);
  filter: drop-shadow(0 6px 8px rgba(188, 43, 38, 0.4));
}

:deep(.leaflet-popup-content) {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

:deep(.leaflet-popup-content-wrapper) {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

:deep(.custom-popup .leaflet-popup-close-button) {
  font-size: 24px;
  color: white;
  padding: 4px 8px;
  opacity: 1;
  transition: all 0.2s ease;
  transform: translateX(-50%);
}

:deep(.custom-popup .leaflet-popup-close-button:hover) {
  color: #bc2b26;
  transform: scale(1.1);
}

:deep(a[href*="/programma"]:hover) {
  background: #a02420 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(188, 43, 38, 0.4) !important;
}

:deep(.leaflet-control-locate) {
  background-color: white;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

:deep(.leaflet-control-locate:hover) {
  border-color: #bc2b26;
  box-shadow: 0 4px 12px rgba(188, 43, 38, 0.2);
}

:deep(.leaflet-control-locate a) {
  color: #bc2b26;
  font-size: 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  transition: all 0.2s;
}

:deep(.leaflet-control-locate a:hover) {
  opacity: 0.8;
}

:deep(.leaflet-control-zoom a) {
  color: #333;
  border-radius: 4px;
  transition: all 0.2s;
}

:deep(.leaflet-control-zoom a:hover) {
  background: #bc2b26;
  color: white;
}

/* Pulsing animation for user location marker */
:deep(.user-location-marker) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(188, 43, 38, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(188, 43, 38, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(188, 43, 38, 0);
  }
}
</style>
