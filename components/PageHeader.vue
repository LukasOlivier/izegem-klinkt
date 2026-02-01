<template>
  <div id="home" class="sm:hidden lg:block">
    <a
      href="/#home"
      aria-label="Back to home"
      class="back-to-top fixed left-5 top-5 z-50 h-20 w-20 cursor-pointer"
    />

    <header
      class="relative z-50 flex flex-row justify-end bg-transparent px-10 py-10"
    >
      <nav class="z-50">
        <ul class="flex w-full flex-row gap-10">
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
      navigationLinks,
    };
  },
};
</script>

<style scoped>
.back-to-top {
  background-image: url("/images/footer-logo.webp");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 9999;
}
</style>
