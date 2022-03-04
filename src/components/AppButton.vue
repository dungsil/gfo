<script lang="ts" setup>

const props = defineProps({
  blocked: Boolean
})
</script>

<template>
  <button class="px-2 py-4 bg-gray-800 font-bold text-2xl text-white border-none" :class="[blocked ? 'blocked' : '']">
    <slot />
  </button>
</template>

<style scoped>
button.blocked {
  display: block;
  width: 100%;
}
</style>
