<script lang="ts" setup>
import { defineProps, PropType } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'text' | 'select' | 'checkbox' | 'radio'>,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  label: String,
  options: Object as PropType<Record<string, string | number | bigint | boolean | Record<string, any>>>,
  value: Object as PropType<string | number | boolean | bigint>
})
</script>

<template>
  <label :for="id">
    <span>{{ label }}</span>

    <select v-if="type === 'select'" :id="id" :name="name" :value="value">
      <option v-for="(option, value) in options" :key="value" :value="value">{{ option }}</option>
    </select>

    <textarea v-else-if="type === 'textarea'" :id="id" :name="name" :value="value"></textarea>
    <input v-else :id="id" :name="name" :type="type" :value="value" />
  </label>
</template>


<style scoped>
label {
  @apply flex flex-col lg:flex-row justify-between items-center mb-4;
}

span {
  @apply block lg:inline-block mr-auto;
}

select,
textarea,
input {
  @apply w-full lg:w-300px;
  @apply px-1 py-2;
  @apply border-3 border-gray-900;
  @apply bg-transparent;
  @apply outline-none;
}
</style>
