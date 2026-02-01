<template>
  <section
    id="info"
    class="m-auto flex items-center justify-between sm:w-full sm:p-10 md:w-full lg:w-7/12 lg:p-0"
  >
    <div class="sm:w-full md:w-full lg:w-2/3 xl:w-2/3">
      <h2 class="mb-2 text-6xl font-bold text-white">Info</h2>
      <p class="leading-relaxed">
        Beste Pekker, dag muziekliefhebber, Jawel, we zijn er weer klaar voor!
        Met trots presenteren wij u onze
        <span class="font-bold">{{ edition }}ste 'Izegem klinkt'</span>, ook dit
        keer
        <span class="font-bold"> gratis en voor niets!</span>
        <br />
        <br />
        We openen zoals altijd met jong muzikaal talent van eigen bodem.
        <br />
        Jonge gasten uit Izegem nemen ons mee op hun allereerste optreden. Een
        warme oproep om deze artiesten massaal aan te moedigen. Afspraak om 19u
        op het Bierkasteelterras, ter hoogte van het Pekkersbeeldje op de Grote
        Markt. U kan er genieten van een frisse Filou, Rubus, Framboise, Rouge
        of Rouge 0,0%.
        <br /><br />
        Waarheen de muzikale avond u verder brengt, bepaalt u uiteraard volledig
        zelf. Het plannetje
        <a
          class="underline"
          target="_blank"
          :href="config.public.lineupPdfUrl"
          @click.prevent="
            !config.public.lineupPdfUrl && showNotAvailableAlert()
          "
        >
          binnenin dit boekje</a
        >
        brengt u probleemloos waar u wil. Een gouden tip : neem even de tijd om
        het Izegem Klinkt-programma anno 2025 door te nemen, dit kan ook via
        <NuxtLink to="/programma" class="underline">deze website</NuxtLink>
        of onze
        <a
          class="underline"
          href="https://www.facebook.com/izegemklinkt"
          target="_blank"
          >FB-pagina</a
        >. Zo mist u geen enkele favoriet en hoeft u de avond zelf alleen maar
        te genieten! <br /><br />
        Het enige wat u nu nog hoeft te doen is
        {{ config.public.eventDate }} met stip in uw agenda aanduiden. Kom erbij
        en wees welkom! Geniet met volle teugen van Izegem Klinkt! <br /><br />
        Wij wensen u veel leute en plezier, De Leutvrienden
      </p>
    </div>
    <div
      class="w-1/4 -rotate-2 object-cover transition-transform duration-500 ease-in-out hover:rotate-0 sm:hidden md:hidden lg:block"
    >
      <a
        :href="config.public.lineupPdfUrl"
        @click.prevent="!config.public.lineupPdfUrl && showNotAvailableAlert()"
        target="_blank"
      >
        <NuxtImg src="/images/boekje.webp" alt="boekje"
      /></a>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
const { showNotAvailableAlert } = useNotAvailableAlert();
const edition = new Date().getFullYear() - 1991;
</script>
