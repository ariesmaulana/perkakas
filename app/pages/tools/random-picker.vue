<script setup>
/**
 * Random Picker Tool
 * Add names and spin to pick a random winner
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const newName = ref('')

/** @type {import('vue').Ref<string[]>} */
const names = ref([])

/** @type {import('vue').Ref<string|null>} */
const winner = ref(null)

/** @type {import('vue').Ref<boolean>} */
const isSpinning = ref(false)

/** @type {import('vue').Ref<string|null>} */
const currentHighlight = ref(null)

/**
 * Adds a name to the list
 */
function addName() {
  const name = newName.value.trim()
  if (name && !names.value.includes(name)) {
    names.value.push(name)
    newName.value = ''
  }
}

/**
 * Removes a name from the list
 * @param {number} index
 */
function removeName(index) {
  names.value.splice(index, 1)
}

/**
 * Clears all names
 */
function clearAll() {
  names.value = []
  winner.value = null
  currentHighlight.value = null
}

/**
 * Gets a cryptographically random index
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random index
 */
function getRandomIndex(max) {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % max
}

/**
 * Spins and picks a random winner with animation
 */
function spin() {
  if (names.value.length < 2 || isSpinning.value) return
  
  winner.value = null
  isSpinning.value = true
  
  let iterations = 0
  const totalIterations = 20 + getRandomIndex(10)
  const baseDelay = 50
  
  function iterate() {
    const randomIndex = getRandomIndex(names.value.length)
    currentHighlight.value = names.value[randomIndex]
    iterations++
    
    if (iterations < totalIterations) {
      // Slow down as we approach the end
      const delay = baseDelay + (iterations * 10)
      setTimeout(iterate, delay)
    } else {
      // Final selection - use crypto random
      const winnerIndex = getRandomIndex(names.value.length)
      winner.value = names.value[winnerIndex]
      currentHighlight.value = null
      isSpinning.value = false
    }
  }
  
  iterate()
}

/**
 * Loads sample names
 */
function loadSample() {
  names.value = ['Luffy', 'Nami', 'Zorro', 'Sanji', 'Chopper', 'Usopp', 'Brook', 'Jinbe', ]
  winner.value = null
}

/** Computed to check if can spin */
const canSpin = computed(() => names.value.length >= 2 && !isSpinning.value)
</script>

<template>
  <NuxtLayout>
    <div class="py-8 sm:py-12">
      <div class="max-w-2xl mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-retro-gray-500 hover:text-retro-gray-700 mb-8 font-body text-sm transition-colors">
          <span>←</span>
          <span>Back to Tools</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 bg-retro-butter border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">🎲</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">RANDOM PICKER</h1>
              <p class="font-body text-sm text-retro-gray-500">Add names and spin to pick a winner</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Add Name Input -->
          <div class="flex gap-3 mb-6">
            <input 
              v-model="newName"
              @keyup.enter="addName"
              type="text"
              placeholder="Enter a name..."
              class="input-retro flex-1"
            />
            <button 
              @click="addName"
              class="btn-retro-primary px-4"
              :disabled="!newName.trim()"
            >
              Add
            </button>
          </div>

          <!-- Controls -->
          <div class="flex gap-3 mb-6">
            <button @click="loadSample" class="btn-retro text-xs">
              Load Sample
            </button>
            <button @click="clearAll" class="btn-retro text-xs" :disabled="names.length === 0">
              Clear All
            </button>
          </div>

          <!-- Names List -->
          <div v-if="names.length > 0" class="mb-6">
            <label class="label-retro mb-3 block">Participants ({{ names.length }})</label>
            <div class="space-y-2">
              <div 
                v-for="(name, index) in names" 
                :key="index"
                class="flex items-center justify-between p-3 border-2 rounded-retro transition-all duration-100"
                :class="{
                  'bg-retro-mint border-retro-gray-400 scale-105': currentHighlight === name,
                  'bg-retro-butter border-retro-gray-400 scale-105 shadow-lg': winner === name,
                  'bg-retro-gray-50 border-retro-gray-200': currentHighlight !== name && winner !== name
                }"
              >
                <span class="font-body text-retro-gray-700">{{ name }}</span>
                <button 
                  @click="removeName(index)"
                  class="text-retro-gray-400 hover:text-red-500 transition-colors"
                  :disabled="isSpinning"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="mb-6 text-center py-8 border-2 border-dashed border-retro-gray-200 rounded-retro">
            <p class="font-body text-retro-gray-400">Add at least 2 names to start</p>
          </div>

          <!-- Spin Button -->
          <button 
            @click="spin"
            class="w-full py-4 btn-retro-primary text-lg"
            :disabled="!canSpin"
            :class="{ 'animate-pulse': isSpinning }"
          >
            <span class="font-display tracking-wider">
              {{ isSpinning ? '🎰 SPINNING...' : '🎲 SPIN' }}
            </span>
          </button>

          <!-- Winner Display -->
          <div v-if="winner && !isSpinning" class="mt-8 text-center">
            <p class="font-display text-lg text-retro-gray-500 mb-2">🎉 THE WINNER IS 🎉</p>
            <div class="inline-block px-8 py-4 bg-retro-butter border-4 border-retro-gray-300 rounded-retro shadow-retro-lg">
              <span class="font-display text-4xl text-retro-gray-800 tracking-wider">{{ winner }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
