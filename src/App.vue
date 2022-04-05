<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import type { Ref } from 'vue'

import AppInput from './components/AppInput.vue'
import AppInputGroup from './components/AppInputGroup.vue'
import AppCheckbox from './components/AppCheckbox.vue'
import AppButton from './components/AppButton.vue'

const avatarType = ref('iconify')
const title = ref('🛸 GFO · GitHub Flavored Open Graph')
const form = ref() as Ref<HTMLFormElement>
const preview = ref() as Ref<HTMLImageElement>
const loadedPreview = ref(true) as Ref<boolean>

async function generateImage() {
  const query = new URLSearchParams(new FormData(form.value) as Record<string, any>).toString()
  preview.value.src = `/api?${query}`
  loadedPreview.value = false
}

useHead({
  title: 'GFO · Github Flavored Open Graph',
  meta: [
    { name: 'description', content: 'Generate Github-like Open Graph image' },

    { name: 'og:type', content: 'website' },
    { name: 'og:url', content: 'https://gfo.vercel.app' },
    { name: 'og:title', content: 'GFO · Github Flavored Open Graph' },
    { name: 'og:description', content: 'Generate Github-like Open Graph image' },
    { name: 'og:image', content: 'https://gfo.vercel.app/og-image.png' },

    { name: 'twitter:creator', content: '@SpringBootTest' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:type', content: 'website' },
    { name: 'twitter:url', content: 'https://gfo.vercel.app' },
    { name: 'twitter:title', content: 'GFO · Github Flavored Open Graph' },
    { name: 'twitter:description', content: 'Generate Github-like Open Graph image' },
    { name: 'twitter:image', content: 'https://gfo.vercel.app/og-image.png' }
  ]
})

function copyUrl () {
  navigator.clipboard.writeText(preview.value.src)
  alert('Copied to clipboard')
}
</script>

<template>
  <div class="flex flex-col items-center w-full min-h-screen">
    <header>
      <h1 class="my-8 font-bold text-4xl text-center">🛸 GFO</h1>
    </header>

    <div class="flex-grow flex flex-col lg:flex-row justify-around items-center w-full max-w-1600px mx-2">
      <main class="w-full xl:max-w-550px mx-2 mb-8">
        <form ref="form" id="og-form" method="GET" action="/api">
          <!-- 추후 확장을 위해 사용되는 옵션 -->
          <input type="hidden" name="format" value="png" />
          <input type="hidden" name="type" value="issue" />

          <AppInput id="repository" name="repository" label="Repository" type="text" value="dungsil/gfo" />
          <AppInput v-model:value="title" id="title" name="title" label="Title" type="text" />
          <AppInput id="description" name="description" label="Description" type="textarea" value="Generate Github-like Open Graph image" />
          <AppInput id="image" name="image" label="Main image URL" type="url" value="https://api.iconify.design/logos/github-icon.svg" />
          <AppInputGroup legend="Avatar" class="my-8">
            <div class="flex flex-row justify-around items-center">
              <AppCheckbox v-model="avatarType"
                           id="avatar-iconify"
                           name="avatar"
                           type="radio"
                           label="Iconify"
                           model-value="iconify"
                           :checked="avatarType === 'iconify'" />

              <AppCheckbox v-model="avatarType"
                           id="avatar-gravatar"
                           name="avatar"
                           type="radio"
                           label="Gravatar"
                           model-value="gravatar"
                           :checked="avatarType === 'gravatar'"/>

              <AppCheckbox v-model="avatarType"
                           id="avatar-url"
                           name="avatar"
                           type="radio"
                           label="URL"
                           model-value="url"
                           :checked="avatarType === 'url'"/>
            </div>

            <div class="w-full mt-8">
              <div v-if="avatarType === 'iconify'">
                <AppInput id="iconify" name="iconify" type="text" label="Icon" value="logos:github-icon" />
              </div>
              <div v-if="avatarType === 'gravatar'">
                <AppInput id="gravatar" name="gravatar" type="email" label="Gravatar user email" value="" />
              </div>
              <div v-if="avatarType === 'url'">
                <AppInput id="url" name="url" type="url" label="Avatar URL" value="" />
              </div>
            </div>
          </AppInputGroup>
          <AppInput id="author" name="author" label="Author" type="text" value="dungsil" />
          <AppInput id="date" name="date" label="Date" type="date" value="2022-03-04" />
          <AppInput id="color" name="color_bar" label="Border color" type="color" value="#6667AB" />

          <AppButton @click.prevent="generateImage" blocked>
            Generate
          </AppButton>
        </form>
      </main>

      <aside class="relative w-970px max-w-full lg:min-w-500px h-auto mt-16 lg:mt-0 lg:ml-16">
        <img ref="preview"
             :class="loadedPreview === true ? [] : ['opacity-10', 'blur-sm']"
             class="max-w-full duration-500 shadow-lg"
             src="/og-image.png"
             alt=""
             @load="loadedPreview = true"
        />

        <div class="mt-4 text-center">
          <AppButton class="text-sm px-2 py-2 bg-blue-500" @click.prevent="copyUrl">
            Copy image URL
          </AppButton>

          <a class="text-sm px-2 py-2 ml-2 bg-purple-500 font-bold text-white" :href="preview?.src" :download="`${title}.png`">
            Download Image
          </a>
        </div>
      </aside>
    </div>
  </div>
</template>
