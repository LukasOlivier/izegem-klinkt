<template>
  <div class="lg:hidden xl:hidden">
    <button
      aria-label="Open mobile menu"
      class="fixed right-0 top-0 z-50 mb-10 flex justify-end px-7 pt-5 hover:cursor-pointer"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
    >
      <template v-if="isMobileMenuOpen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-10"
        >
          <path
            d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          class="w-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </template>
    </button>
    <header
      :class="{ hidden: !isMobileMenuOpen }"
      class="fixed right-0 top-0 z-40 flex h-screen w-2/3 flex-row justify-end bg-black bg-opacity-95 px-10 py-10"
    >
      <nav class="relative z-40 mt-10 flex flex-col items-end">
        <ul class="z-40 flex flex-col gap-10 text-right">
          <li v-for="link in navigationLinks" :key="link.href">
            <a
              class="text-lg font-bold uppercase hover:underline"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { navigationLinks } from "@/constants/navigation";

export default {
  data() {
    return {
      isMobileMenuOpen: false,
      navigationLinks,
    };
  },
};
</script>

<style scoped>
#mobile-menu {
  transition: opacity 0.3s ease-in-out;
}

#mobile-menu.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>
