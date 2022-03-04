<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <img class="inline text-base" :src="`https://api.iconify.design/logos/${icon}.svg`" :alt="alt">
</template>
