<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import type { Ref } from 'vue'

import AppInput from './components/AppInput.vue'
import AppInputGroup from './components/AppInputGroup.vue'
import AppCheckbox from './components/AppCheckbox.vue'
import AppButton from './components/AppButton.vue'

const avatarType = ref('iconify')
const form = ref() as Ref<HTMLFormElement>
const preview = ref() as Ref<HTMLImageElement>

async function generateImage() {
  const query = new URLSearchParams(new FormData(form.value) as Record<string, any>).toString()
  preview.value.src = `/api?${query}`
}

useHead({
  title: 'GFO · Github Flavored Open Graph',
  meta: [
    { name: 'description', content: 'Generate Github-like Open Graph image' },
    { name: 'og:image', content: '/api?format=png&type=issue&repository=dungsil%2Fgfo&title=🛸+GFO+·+GitHub+Flavored+Open+Graph&description=Generate+Github-like+Open+Graph+image&image=https%3A%2F%2Fapi.iconify.design%2Flogos%2Fgithub-icon.svg&author=dungsil&date=2022-03-04&color_bar=%236667ab&avatar=gravatar&gravatar=mail%40kyg.kr' }
  ]
})

onMounted(() => {
  generateImage()
})
</script>

<template>
  <div class="flex flex-col items-center w-full min-h-screen">
    <header>
      <h1 class="my-8 font-bold text-4xl text-center">🛸 GFO</h1>
    </header>

    <div class="flex-grow flex flex-col lg:flex-row justify-around items-center max-w-1600px mx-2">
      <main class="w-full md:max-w-550px mx-2 mb-8">
        <form ref="form" id="og-form" method="GET" action="/api">
          <!-- 추후 확장을 위해 사용되는 옵션 -->
          <input type="hidden" name="format" value="png" />
          <input type="hidden" name="type" value="issue" />

          <AppInput id="repository" name="repository" label="Repository" type="text" value="dungsil/gfo" />
          <AppInput id="title" name="title" label="Title" type="text" value="🛸 GFO · GitHub Flavored Open Graph" />
          <AppInput id="description" name="description" label="Description" type="textarea" value="Generate Github-like Open Graph image" />
          <AppInput id="image" name="image" label="Main image URL" type="url" value="https://api.iconify.design/logos/github-icon.svg" />
          <AppInput id="author" name="author" label="Author" type="text" value="dungsil" />
          <AppInput id="date" name="date" label="Date" type="date" value="2022-03-04" />
          <AppInput id="color" name="color_bar" label="Border color" type="color" value="#6667AB" />
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

          <AppButton @click.prevent="generateImage" blocked>
            Generate
          </AppButton>
        </form>
      </main>

      <figure class="w-full max-w-1024px 2xl:w-1024px m-4 lg:ml-16 shadow-lg">
        <img ref="preview" src="" alt="" />
      </figure>
    </div>

    <footer class="px-2 py-4 text-sm text-center text-gray-500">
      <p>
        Images created by this API are free to use, and any problems arising from using the API are at your own risk.
      </p>
    </footer>
  </div>
</template>
