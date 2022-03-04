<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<'checkbox' | 'radio'>,
    default: 'checkbox'
  },
  label: String,
  modelValue: Object as PropType<string | number | boolean | Record<string, any>>,
  checked: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="id">
    <input :id="id"
           :name="name"
           :type="type"
           :value="modelValue"
           :checked="checked"
           @input="$emit('update:modelValue', $event.target.value)">

    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
input {
  display: none;
}

label {
  @apply inline-block;
}

input + span {
  @apply font-500;
}

input + span::before {
  @apply relative inline-block w-20px h-20px mr-1 border-3 border-gray-900 align-middle;
  content: '';
}

input[type=radio] + span::before {
  @apply rounded-1/2;
}

input:checked + span::before {
  @apply bg-gray-900 bg-no-repeat bg-center;

  background-image: url('https://api.iconify.design/ci/check-bold.svg?color=white');
}
</style>
