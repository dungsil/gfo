<script lang="ts" setup>
const props = defineProps({
  legend: {
    type: String,
  }
})
</script>

<template>
  <fieldset class="flex flex-col p-2 border-4 border-dashed border-gray-600">
    <legend v-if="legend !== undefined" class="px-4 bg-gray-900 font-500 text-white">{{ legend }}</legend>

    <slot />
  </fieldset>
</template>
