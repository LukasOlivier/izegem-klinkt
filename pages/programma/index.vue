<template>
  <div>
    <PageHeader />
    <HamburgerMenu />
    <div class="mx-auto flex w-9/12 flex-col">
      <h1 class="mb-10 mt-20 text-5xl font-bold text-white">Programma</h1>
      <a
        class="underline"
        target="_blank"
        :href="config.public.lineupPdfUrl || '#'"
        @click="onPdfClick"
      >
        <h2 class="mb-10 text-2xl font-bold text-white">
          Bekijk hier het programmaboekje
        </h2>
      </a>

      <!-- Year tabs - Only show if we have bands -->
      <div
        v-if="Object.keys(bands).length > 0 && !isLoading"
        class="mb-8 border-b border-gray-200"
      >
        <ul class="-mb-px flex flex-wrap text-center text-sm font-medium">
          <li v-for="year in years" :key="year" class="mr-2">
            <button
              class="inline-block rounded-t-lg p-4"
              :class="[
                selectedYear === year
                  ? 'border-b-2 border-white text-white'
                  : 'text-gray-400 hover:border-gray-300 hover:text-gray-300',
              ]"
              @click="selectedYear = year"
            >
              <p class="font-semibold text-white">{{ year }}</p>
            </button>
          </li>
        </ul>
      </div>

      <!-- Band cards with transition -->
      <transition name="fade-slide" mode="out-in">
        <div
          v-if="bands[selectedYear]?.length > 0"
          :key="selectedYear"
          class="mx-auto grid w-full grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          <div
            v-for="lineUpItem in bands[selectedYear]"
            :key="lineUpItem.lookupName"
            class="flex w-full justify-center"
          >
            <div class="w-full max-w-xs">
              <BandCard
                :location="lineUpItem.location"
                :band-photo="lineUpItem.bandPhoto"
                :band-name="lineUpItem.bandName"
                :time="lineUpItem.time"
                :lookup-name="lineUpItem.lookupName"
              />
            </div>
          </div>
        </div>
        <div v-else-if="isLoading" key="loading" class="min-h-64">
          <p class="w-full text-center text-2xl font-semibold text-white">
            Bands ophalen...
          </p>
        </div>
        <div v-else-if="hasError" key="error" class="min-h-64">
          <p class="w-full text-center text-2xl font-semibold text-white">
            Er is een probleem opgetreden bij het laden van de bands.
          </p>
        </div>
        <div
          v-else
          key="no-bands"
          class="flex min-h-64 flex-col items-center justify-center"
        >
          <p class="mb-6 w-full text-center text-3xl font-bold text-white">
            Programma {{ selectedYear }} komt binnenkort!
          </p>
          <p class="mb-8 w-full text-center text-lg text-gray-300">
            Volg onze socials om op de hoogte te blijven van de laatste updates.
          </p>
          <ul class="flex flex-row items-center gap-7">
            <li>
              <a
                href="https://www.facebook.com/izegemklinkt"
                aria-label="Visit our Facebook page"
                target="_blank"
                ><svg
                  class="w-12 transition-transform hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 512 510.125"
                >
                  <path
                    fill="#fff"
                    fill-rule="nonzero"
                    d="M512 256C512 114.615 397.385 0 256 0S0 114.615 0 256c0 120.059 82.652 220.797 194.157 248.461V334.229h-52.79V256h52.79v-33.709c0-87.134 39.432-127.521 124.977-127.521 16.218 0 44.202 3.18 55.651 6.36v70.916c-6.042-.635-16.537-.954-29.575-.954-41.977 0-58.196 15.901-58.196 57.241V256h83.619l-14.365 78.229h-69.254v175.896C413.771 494.815 512 386.885 512 256z"
                  /></svg
              ></a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/izegem_klinkt/"
                aria-label="Visit our Instagram page"
                target="_blank"
                ><svg
                  class="w-12 transition-transform hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                  shape-rendering="geometricPrecision"
                  text-rendering="geometricPrecision"
                  image-rendering="optimizeQuality"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff"
                    fill-rule="nonzero"
                    d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.483 47.121-.092 85.407 38.03 85.499 85.16.091 47.129-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.091c.141 72.602 59.106 131.327 131.69 131.186 72.592-.141 131.35-59.09 131.209-131.692-.141-72.577-59.114-131.335-131.715-131.194-72.585.141-131.325 59.115-131.184 131.7zm237.104-137.091c.033 16.953 13.817 30.681 30.772 30.648 16.961-.033 30.689-13.811 30.664-30.764-.033-16.954-13.818-30.69-30.78-30.657-16.962.033-30.689 13.818-30.656 30.773zm-208.696 345.4c-24.958-1.087-38.511-5.234-47.543-8.709-11.961-4.629-20.496-10.178-29.479-19.094-8.966-8.95-14.532-17.46-19.202-29.397-3.508-9.032-7.73-22.569-8.9-47.527-1.269-26.982-1.559-35.077-1.683-103.432-.133-68.339.116-76.434 1.294-103.441 1.069-24.942 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.479 8.949-8.982 17.459-14.532 29.403-19.202 9.025-3.525 22.561-7.714 47.511-8.9 26.998-1.277 35.085-1.551 103.423-1.684 68.353-.132 76.448.108 103.456 1.295 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.144 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.412 3.524 9 7.714 22.553 8.892 47.494 1.285 26.999 1.576 35.095 1.7 103.433.132 68.355-.117 76.451-1.302 103.441-1.087 24.958-5.226 38.52-8.709 47.561-4.629 11.952-10.161 20.487-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.559-103.448 1.684-68.338.132-76.424-.125-103.431-1.294z"
                  /></svg
              ></a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <PageFooter />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { showNotAvailableAlert } = useNotAvailableAlert();

// Fetch bands data once and cache it
const {
  data: bandsData,
  pending: isLoading,
  error: fetchError,
} = await useFetch("/api/bands");

const bands = ref(bandsData.value || {});
const hasError = ref(!!fetchError.value);

watch(bandsData, (newData) => {
  if (newData) {
    bands.value = newData;
  }
});

const years = computed(() => {
  const bandYears = Object.keys(bands.value);
  const currentYear = new Date().getFullYear().toString();

  // Add current year if not already in the list
  if (!bandYears.includes(currentYear)) {
    bandYears.push(currentYear);
  }

  return bandYears.sort().reverse();
});
const selectedYear = ref("");

const onPdfClick = (event) => {
  if (!config.public.lineupPdfUrl) {
    event.preventDefault();
    showNotAvailableAlert();
  }
};

watch(
  [years, isLoading],
  () => {
    if (!isLoading.value && years.value.length > 0 && !selectedYear.value) {
      selectedYear.value = years.value[0];
    }
  },
  { immediate: true },
);

useHead({
  title: "Programma",
  meta: [
    {
      name: "description",
      content:
        "Ontdek het volledige programma van Izegem Klinkt. Bekijk alle bands, podia en speeltijden van het festival.",
    },
    {
      name: "keywords",
      content:
        "Izegem Klinkt, festival programma, line-up, bands, muziekfestival, Izegem",
    },
    {
      property: "og:title",
      content: "Programma | Izegem Klinkt",
    },
    {
      property: "og:description",
      content:
        "Ontdek het volledige programma van Izegem Klinkt. Bekijk alle bands, podia en speeltijden van het festival.",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.izegemklinkt.be/programma" }],
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
