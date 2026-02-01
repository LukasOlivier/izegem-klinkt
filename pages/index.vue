<template>
  <div>
    <PageHeader />
    <HamburgerMenu />
    <MainHero />
    <MainPractical />
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
