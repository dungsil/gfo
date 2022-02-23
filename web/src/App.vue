<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { useHead } from '@vueuse/head'

import AppInput from './components/AppInput.vue'
import AppInputGroup from './components/AppInputGroup.vue'
import AppCheckbox from './components/AppCheckbox.vue'
import AppButton from './components/AppButton.vue'

const formats = {
  png: 'PNG'
}

const type = {
  issue: 'Issue'
}

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
    { name: 'og:image', content: '/api?format=png&type=issue&repository=dungsil%2Fgfo&author=dungsil&title=GitHub+Flavored+Open+Graph&description=Generate+Github-like+Open+Graph+image&avatar=gravatar&gravatar=mail%40kyg.kr' }
  ]
})

onMounted(async () => {
  await generateImage()
})
</script>

<template>
  <div class="flex flex-col justify-between items-center w-full min-h-screen font-sans font-normal text-lg">
    <header class="py-8">
      <h1 class="font-bold text-4xl">🛸 GFO</h1>
    </header>

    <main class="flex flex-col lg:flex-row items-center mx-4">
      <aside class="w-full lg:w-500px">
        <form ref="form" id="og-form" method="GET" action="/api">
          <AppInput name="format" label="Image format" type="select" :options="formats" value="png" />
          <AppInput name="type" label="Template type" type="select" :options="type" value="issue" />

          <AppInput name="repository" label="Repository" type="text" value="dungsil/gfo" />
          <AppInput name="author" label="Author" type="text" value="dungsil" />
          <AppInput name="title" label="Title" type="text" value="GitHub Flavored Open Graph" />
          <AppInput name="description" label="Description" type="textarea" value="Generate Github-like Open Graph image" />

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

            <div class="w-full mt-4 pt-4 border-t-3 border-gray-500 border-dotted">
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
      </aside>

      <div class="w-full max-w-1200px lg:min-w-50vw ml-32 shadow-lg">
        <img ref="preview" alt="">
      </div>
    </main>

    <footer class="py-4 text-sm text-center text-gray-500">
      Images created by this API are free to use, and any problems arising from using the API are at your own risk.
    </footer>
  </div>
</template>
