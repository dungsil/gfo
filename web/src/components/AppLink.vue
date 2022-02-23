<script lang="ts" setup>
import { defineProps, PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | undefined>,
    default: '_blank'
  }
})
</script>

<template>
  <a class="font-semibold" :href="href" :target="target">
    <slot />
  </a>
</template>
