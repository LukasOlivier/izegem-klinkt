<template>
  <footer class="w-100 footer mt-32 px-20 py-10">
    <div id="top-row" class="mb-10 flex justify-between">
      <img
        src="/images/footer-logo.webp"
        class="w-40 object-contain sm:hidden md:hidden lg:block"
        alt="logo"
      />
      <div
        id="info"
        class="flex gap-10 sm:w-full sm:flex-col sm:justify-between md:w-full md:flex-row lg:justify-end"
      >
        <div id="contact" class="flex flex-col">
          <h3 class="mb-3 text-3xl">Contact</h3>
          <ul class="flex flex-col gap-2">
            <li
              v-for="info in contactInfo"
              :key="info.href"
              class="flex flex-row items-center gap-2"
            >
              <IconsPhone v-if="info.type === 'phone'" />
              <IconsEmail v-else-if="info.type === 'email'" />
              <a :href="info.href">{{ info.value }}</a>
            </li>
          </ul>
        </div>
        <div id="socials" class="flex flex-col">
          <h3 class="mb-5 text-3xl sm:hidden md:block lg:block xl:block">
            Sociale Media
          </h3>
          <ul class="flex flex-row items-center gap-7">
            <li v-for="social in socialLinks" :key="social.name">
              <a
                :href="social.url"
                :aria-label="social.ariaLabel"
                target="_blank"
              >
                <IconsFacebook v-if="social.name === 'Facebook'" />
                <IconsInstagram v-else-if="social.name === 'Instagram'" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nav class="flex flex-wrap justify-between border-t pt-5">
      <ul class="text-md flex flex-wrap gap-5 sm:gap-3">
        <li v-for="link in navigationLinks" :key="link.href">
          <a class="font-bold uppercase hover:underline" :href="link.href">
            {{ link.label }}
          </a>
        </li>
      </ul>
      <span class="sm:mt-5"
        >&copy;
        <a
          target="_blank"
          aria-label="Visit the website of Lukas Olivier, the developer of this website"
          href="https://lukasolivier.be"
          >Lukas Olivier</a
        ></span
      >
    </nav>
  </footer>
</template>

<script>
import {
  navigationLinks,
  socialLinks,
  contactInfo,
} from "@/constants/navigation";

export default {
  data() {
    return {
      navigationLinks,
      socialLinks,
      contactInfo,
    };
  },
};
</script>

<style scoped>
.footer {
  background: #bc2b26;
  color: #fff;
}
::selection {
  background: white;
  color: #bc2b26;
}

a:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
