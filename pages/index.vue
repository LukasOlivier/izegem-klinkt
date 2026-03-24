<template>
  <div>
    <PageHeader />
    <HamburgerMenu />
    <MainHero />
    <MainPractical />
    <MainSectionDivider :border="true" />
    <Suspense>
      <template #default>
        <MainBandsMap />
      </template>
      <template #fallback>
        <div class="mx-auto max-w-7xl px-4">
          <div
            class="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/30 shadow-2xl backdrop-blur-sm"
            role="status"
            aria-label="Kaart laden"
          >
            <div class="h-[500px] w-full md:h-[650px] lg:h-[700px] animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
          </div>
        </div>
      </template>
    </Suspense>
    <MainSectionDivider :border="true" />
    <MainInfo />
    <MainSectionDivider :border="true" />
    <MainAboutUs />
    <PageFooter />
  </div>
</template>

<script setup>
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content:
        "Izegem Klinkt is een muziekfestival in Izegem. Ontdek het programma, praktische informatie en meer.",
    },
    {
      name: "keywords",
      content:
        "Izegem, muziekfestival, festival, Izegem Klinkt, muziek, optredens, concerten",
    },

    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.izegemklinkt.be/" },
    { property: "og:title", content: "Izegem Klinkt - Home" },
    {
      property: "og:description",
      content:
        "Izegem Klinkt is een muziekfestival in Izegem. Ontdek het programma, praktische informatie en meer.",
    },
    {
      property: "og:image",
      content: "https://www.izegemklinkt.be/logo.png",
    },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://www.izegemklinkt.be/" },
    { name: "twitter:title", content: "Izegem Klinkt - Home" },
    {
      name: "twitter:description",
      content:
        "Izegem Klinkt is een muziekfestival in Izegem. Ontdek het programma, praktische informatie en meer.",
    },
    {
      name: "twitter:image",
      content: "https://www.izegemklinkt.be/logo.png",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.izegemklinkt.be/" }],
});
</script>
