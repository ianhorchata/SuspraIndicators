<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { openDB } from 'idb'

const router = useRouter()

const g1 = ref('')
const g1a = ref(null)
const g2 = ref({
  clothing: null,
  furniture: null,
  cookware: null,
  electronics: null,
  appliances: null,
  homegoods: null,
  tools: null,
  vehicles: null,
  other: null,
})
const g3 = ref({
  clothing: null,
  furniture: null,
  cookware: null,
  electronics: null,
  appliances: null,
  homegoods: null,
  tools: null,
})
const g4 = ref({
  clothing: null,
  furniture: null,
  cookware: null,
  electronics: null,
  appliances: null,
  homegoods: null,
  tools: null,
})

const g1aOptions = [
  { text: 'Less than $250', value: 1 },
  { text: '$250–$499', value: 2 },
  { text: '$500–$999', value: 3 },
  { text: '$1,000–$2,499', value: 4 },
  { text: '$2,500 or more', value: 5 },
  { text: 'Web Blank', value: 97 },
]
const g2Options = [
  { text: 'Mostly New', value: 1 },
  { text: 'Mix of New & Secondhand', value: 2 },
  { text: 'Mostly Secondhand', value: 3 },
  { text: 'I Don’t Buy These', value: 4 },
  { text: 'Web Blank', value: 97 },
]
const g3ClothingOptions = [
  { text: 'Mostly synthetic (e.g., polyester, spandex, nylon, acrylic)', value: 1 },
  { text: 'Mostly natural fibers (e.g., cotton, wool, linen)', value: 2 },
  { text: 'A mix of both', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const g3FurnitureOptions = [
  { text: 'Mostly made from plastic, laminate, or engineered wood', value: 1 },
  { text: 'Mostly made from solid wood, metal, or natural materials', value: 2 },
  { text: 'Mostly treated with stain resistant or water repellent synthetic coating', value: 3 },
  { text: 'A mix', value: 4 },
  { text: 'Web Blank', value: 97 },
]
const g3CookwareOptions = [
  { text: 'Mostly plastic or non-stick (e.g., Teflon)', value: 1 },
  { text: 'Mostly stainless steel, cast iron, or glass', value: 2 },
  { text: 'A mix of both', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const g3HomegoodsOptions = [
  { text: 'Mostly synthetic or plastic (e.g., polyester, vinyl, plastic)', value: 1 },
  { text: 'Mostly natural materials (e.g., wood, cotton, wool, glass, metal)', value: 2 },
  { text: 'A mix of both', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const g3ToolsOptions = [
  { text: 'Mostly plastic or disposable materials', value: 1 },
  { text: 'Mostly metal, wood, or durable/high-quality materials', value: 2 },
  { text: 'A mix of both', value: 3 },
  { text: 'Web Blank', value: 97 },
]
const g4Options = [
  { text: 'Donate or Sell', value: 1 },
  { text: 'Recycle', value: 3 },
  { text: 'Compost', value: 4 },
  { text: 'Trash', value: 5 },
  { text: 'Divert', value: 6 },
  { text: 'I Don’t Buy These', value: 7 },
  { text: 'Web Blank', value: 97 },
]

async function startOver() {
  try {
    const suspraDB = await openDB('SuspraDB', 1)
    if (suspraDB.objectStoreNames.contains('goods')) {
      await suspraDB.clear('goods')
    }
    router.push({ name: 'home' })
  } catch (error) {
    router.push({ name: 'home' })
  }
}

function onNext() {
  // Save data to IndexedDB (optional, can be expanded)
  router.push({ name: 'habitat' })
}
function onBack() {
  router.push({ name: 'energy' })
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center" style="min-height: 100vh; max-width: 600px;">
    <v-card elevation="8" class="pa-6" style="width: 100%;">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2>Goods Pathway</h2>
        <v-btn color="error" variant="outlined" size="small" @click="startOver">Start Over</v-btn>
      </div>
      <form @submit.prevent="onNext">
        <!-- G1 -->
        <v-text-field
          v-model="g1"
          label="About how much money do you spend on physical goods (not including food or services or renting items) in a typical 3-month period? ($ in 3 months)"
          type="number"
          min="0"
          class="mb-4"
        />
        <!-- G1a: Only show if G1 is blank or 97/98 -->
        <v-select
          v-if="g1 === '' || g1 == 97 || g1 == 98"
          v-model="g1a"
          :items="g1aOptions"
          label="Or select a range"
          class="mb-4"
        />
        <!-- G2: For each category, how do you typically buy these items? -->
        <div class="mb-4">
          <h4>For each of the following categories, how do you typically buy these items?</h4>
          <v-select v-for="cat in Object.keys(g2)" :key="cat" v-model="g2[cat]" :items="g2Options" :label="cat.charAt(0).toUpperCase() + cat.slice(1)" class="mb-2" />
        </div>
        <!-- G3: For each category, what kinds of materials do you typically choose? -->
        <div class="mb-4">
          <h4>When buying the following types of products, what kinds of materials do you typically choose?</h4>
          <v-select v-model="g3.clothing" :items="g3ClothingOptions" label="Clothing" class="mb-2" />
          <v-select v-model="g3.furniture" :items="g3FurnitureOptions" label="Furniture" class="mb-2" />
          <v-select v-model="g3.cookware" :items="g3CookwareOptions" label="Cookware" class="mb-2" />
          <v-select v-model="g3.homegoods" :items="g3HomegoodsOptions" label="Home Goods and Decor" class="mb-2" />
          <v-select v-model="g3.tools" :items="g3ToolsOptions" label="Tools and Equipment" class="mb-2" />
        </div>
        <!-- G4: For each item type, how do you most often get rid of them? -->
        <div class="mb-4">
          <h4>For each of the following item types, how do you most often get rid of them when you no longer need them?</h4>
          <v-select v-for="cat in Object.keys(g4)" :key="cat" v-model="g4[cat]" :items="g4Options" :label="cat.charAt(0).toUpperCase() + cat.slice(1)" class="mb-2" />
        </div>
        <div class="d-flex justify-space-between mt-6">
          <v-btn color="secondary" @click="onBack">Back</v-btn>
          <v-btn color="primary" type="submit">Next</v-btn>
        </div>
      </form>
    </v-card>
  </v-container>
</template>
