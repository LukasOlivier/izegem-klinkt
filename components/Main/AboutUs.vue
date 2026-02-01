<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    id="ons-verhaal"
    class="m-auto flex justify-between sm:w-full sm:p-10 md:w-full lg:w-7/12 lg:p-0 xl:w-7/12"
  >
    <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2">
      <h2 class="mb-2 text-6xl font-bold text-white">Ons Verhaal</h2>
      <p class="mb-4">
        Welkom bij Izegem Klinkt, een betoverende muzikale tournée in de
        Pekkersstad. Al meer dan 30 edities lang vieren we muziek, gezelligheid
        en samenzijn, en dat allemaal dankzij het toegewijde werk van
        gepassioneerde vrijwilligers.
      </p>
      <p class="mb-4">
        In de bruisende maand mei nodigen we jong en oud uit om deel te nemen
        aan ons unieke evenement, dat gratis toegankelijk is voor iedereen.
        Izegem Klinkt biedt voor elk wat wils: van nostalgische klanken tot
        eigentijdse beats.
      </p>
      <p>
        Ons evenement voegt niet alleen muzikale variatie toe aan de Stad
        Izegem, maar creëert ook een warme en levendige sfeer die de gemeenschap
        verbindt. We hopen dat u erbij bent!
      </p>
    </div>
    <div
      class="w-1/3 rotate-2 object-cover transition-transform duration-500 ease-in-out hover:rotate-0 sm:hidden md:hidden lg:block"
    >
      <Galleria
        :value="images"
        :transition-interval="3000"
        :circular="true"
        container-style="max-width: 640px"
        :auto-play="true"
        :show-thumbnails="false"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.itemImageSrc"
            :alt="slotProps.item.alt"
            :style="{
              objectFit: 'cover',
              width: '400px',
              height: '400px',
            }"
          />
        </template>
      </Galleria>
    </div>
  </section>
</template>

<script setup>
const images = ref([]);

onMounted(async () => {
  images.value = await import("~/data/gallery-images").then((m) => m.default);
});
</script>
