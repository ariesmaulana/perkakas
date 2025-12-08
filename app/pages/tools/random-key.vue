<script setup>
/**
 * Random Key Generator Tool
 * Generates secure WPA and WEP encryption keys
 * @component
 */
import { ref } from 'vue'

/** @type {import('vue').Ref<string[]>} */
const wpaKeys = ref([])

/** @type {import('vue').Ref<string[]>} */
const wepKeys = ref([])

/** @type {import('vue').Ref<string|null>} */
const copiedKey = ref(null)

const hexChars = '0123456789ABCDEF'
const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-='

/**
 * Generates a random string of specified length from given character set
 * @param {number} length - Length of string to generate
 * @param {string} charset - Character set to use
 * @returns {string} Random string
 */
function generateRandomString(length, charset) {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset[array[i] % charset.length]
  }
  return result
}

/**
 * Generates 160-bit WPA keys (20 characters)
 */
function generateWpaKeys() {
  wpaKeys.value = []
  for (let i = 0; i < 3; i++) {
    wpaKeys.value.push(generateRandomString(20, allChars))
  }
}

/**
 * Generates 256-bit WEP keys (64 hex characters)
 */
function generateWepKeys() {
  wepKeys.value = []
  for (let i = 0; i < 3; i++) {
    wepKeys.value.push(generateRandomString(64, hexChars))
  }
}

/**
 * Generates all key types
 */
function generateAllKeys() {
  generateWpaKeys()
  generateWepKeys()
}

/**
 * Copies a key to clipboard
 * @param {string} key - Key to copy
 */
async function copyKey(key) {
  try {
    await navigator.clipboard.writeText(key)
    copiedKey.value = key
    setTimeout(() => {
      copiedKey.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Generate initial keys
generateAllKeys()
</script>

<template>
  <NuxtLayout>
    <div class="py-8 sm:py-12">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-retro-gray-500 hover:text-retro-gray-700 mb-8 font-body text-sm transition-colors">
          <span>←</span>
          <span>Back to Tools</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 bg-retro-peach border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">🔑</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">RANDOM KEY GENERATOR</h1>
              <p class="font-body text-sm text-retro-gray-500">Generate secure encryption keys</p>
            </div>
          </div>
        </div>

        <!-- Regenerate Button -->
        <div class="mb-8">
          <button 
            @click="generateAllKeys"
            class="btn-retro-primary py-3 px-6"
          >
            <span class="font-display tracking-wide">🔄 REGENERATE ALL KEYS</span>
          </button>
        </div>

        <!-- WPA Keys Section -->
        <div class="card-retro p-6 mb-10">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="font-display text-xl text-retro-gray-800 tracking-wider">160-BIT WPA KEYS</h2>
              <p class="font-body text-xs text-retro-gray-500 mt-1">20 character keys for WPA/WPA2 networks</p>
            </div>
            <button 
              @click="generateWpaKeys"
              class="btn-retro text-xs"
            >
              Regenerate
            </button>
          </div>
          
          <div class="space-y-6">
            <div 
              v-for="(key, index) in wpaKeys" 
              :key="'wpa-' + index"
              class="flex items-center gap-3 p-3 bg-retro-gray-50 border-2 border-retro-gray-200 rounded-retro group"
            >
              <code class="flex-1 font-mono text-sm text-retro-gray-700 break-all py-2">{{ key }}</code>
              <button 
                @click="copyKey(key)"
                class="btn-retro text-xs shrink-0"
                :class="{ 'bg-retro-mint': copiedKey === key }"
              >
                {{ copiedKey === key ? '✓' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>

        <!-- WEP Keys Section -->
        <div class="card-retro p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="font-display text-xl text-retro-gray-800 tracking-wider">256-BIT WEP KEYS</h2>
              <p class="font-body text-xs text-retro-gray-500 mt-1">64 character hexadecimal keys</p>
            </div>
            <button 
              @click="generateWepKeys"
              class="btn-retro text-xs"
            >
              Regenerate
            </button>
          </div>
          
          <div class="space-y-6">
            <div 
              v-for="(key, index) in wepKeys" 
              :key="'wep-' + index"
              class="flex items-center gap-3 p-4 bg-retro-gray-50 border-2 border-retro-gray-200 rounded-retro group"
            >
              <code class="flex-1 font-mono text-xs text-retro-gray-700 break-all py-2">{{ key }}</code>
              <button 
                @click="copyKey(key)"
                class="btn-retro text-xs shrink-0"
                :class="{ 'bg-retro-mint': copiedKey === key }"
              >
                {{ copiedKey === key ? '✓' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
