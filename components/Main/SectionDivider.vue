<template>
  <div class="mx-auto my-32 w-1/2">
    <hr v-if="border" class="border-1 border-zinc-500" />
  </div>
</template>

<script setup>
defineProps({
  border: {
    type: Boolean,
    default: false,
  },
});
</script>
