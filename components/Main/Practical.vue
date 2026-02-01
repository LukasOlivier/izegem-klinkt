<template>
  <section
    id="praktisch"
    class="relative z-10 m-auto flex w-7/12 flex-col items-center justify-center"
  >
    <h2 class="mb-20 mt-10 text-center text-6xl font-bold text-white">
      Praktisch
    </h2>
    <ul
      class="flex w-full flex-wrap justify-between gap-10 sm:flex-col sm:gap-10 md:flex-col lg:flex-row xl:flex-row"
    >
      <li class="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="mb-5 h-20 w-20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-xl">{{ config.public.eventDate }}</p>
        <p class="text-lg">19u00 - 01u00</p>
      </li>
      <li class="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="mb-5 h-20 w-20"
        >
          <path
            fill-rule="evenodd"
            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
            clip-rule="evenodd"
          />
        </svg>

        <p class="text-xl">Grote Markt</p>
        <p class="text-lg">Izegem</p>
      </li>
      <li class="flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="mb-5 h-20 w-20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.798 7.45c.512-.67 1.135-.95 1.702-.95s1.19.28 1.702.95a.75.75 0 0 0 1.192-.91C12.637 5.55 11.596 5 10.5 5s-2.137.55-2.894 1.54A5.205 5.205 0 0 0 6.83 8H5.75a.75.75 0 0 0 0 1.5h.77a6.333 6.333 0 0 0 0 1h-.77a.75.75 0 0 0 0 1.5h1.08c.183.528.442 1.023.776 1.46.757.99 1.798 1.54 2.894 1.54s2.137-.55 2.894-1.54a.75.75 0 0 0-1.192-.91c-.512.67-1.135.95-1.702.95s-1.19-.28-1.702-.95a3.505 3.505 0 0 1-.343-.55h1.795a.75.75 0 0 0 0-1.5H8.026a4.835 4.835 0 0 1 0-1h2.224a.75.75 0 0 0 0-1.5H8.455c.098-.195.212-.38.343-.55Z"
            clip-rule="evenodd"
          />
        </svg>

        <p class="text-xl">Gratis</p>
        <p class="text-xl">Toegang</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
const config = useRuntimeConfig();
</script>
