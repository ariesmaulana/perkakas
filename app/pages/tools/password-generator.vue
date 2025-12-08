<script setup>
/**
 * Password Generator Tool
 * Generates secure random passwords with customizable options
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<number>} */
const length = ref(16)

/** @type {import('vue').Ref<boolean>} */
const includeUppercase = ref(true)

/** @type {import('vue').Ref<boolean>} */
const includeLowercase = ref(true)

/** @type {import('vue').Ref<boolean>} */
const includeNumbers = ref(true)

/** @type {import('vue').Ref<boolean>} */
const includeSymbols = ref(true)

/** @type {import('vue').Ref<string>} */
const password = ref('')

/** @type {import('vue').Ref<boolean>} */
const copied = ref(false)

const charSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}

/**
 * Generates a random password based on selected options
 */
function generatePassword() {
  let chars = ''
  
  if (includeUppercase.value) chars += charSets.uppercase
  if (includeLowercase.value) chars += charSets.lowercase
  if (includeNumbers.value) chars += charSets.numbers
  if (includeSymbols.value) chars += charSets.symbols
  
  if (chars.length === 0) {
    chars = charSets.lowercase
  }
  
  let result = ''
  const array = new Uint32Array(length.value)
  crypto.getRandomValues(array)
  
  for (let i = 0; i < length.value; i++) {
    result += chars[array[i] % chars.length]
  }
  
  password.value = result
  copied.value = false
}

/**
 * Copies the generated password to clipboard
 */
async function copyToClipboard() {
  if (!password.value) return
  
  try {
    await navigator.clipboard.writeText(password.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

/** @type {import('vue').ComputedRef<number>} */
const strengthScore = computed(() => {
  let score = 0
  if (length.value >= 12) score++
  if (length.value >= 16) score++
  if (includeUppercase.value) score++
  if (includeLowercase.value) score++
  if (includeNumbers.value) score++
  if (includeSymbols.value) score++
  return Math.min(score, 5)
})

/** @type {import('vue').ComputedRef<{label: string, color: string}>} */
const strengthLabel = computed(() => {
  const labels = [
    { label: 'Very Weak', color: 'bg-red-300' },
    { label: 'Weak', color: 'bg-orange-300' },
    { label: 'Fair', color: 'bg-yellow-300' },
    { label: 'Good', color: 'bg-lime-300' },
    { label: 'Strong', color: 'bg-green-300' },
    { label: 'Very Strong', color: 'bg-retro-mint' }
  ]
  return labels[strengthScore.value]
})

// Generate initial password
generatePassword()
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
            <div class="w-14 h-14 bg-retro-mint border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">🔐</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">PASSWORD GENERATOR</h1>
              <p class="font-body text-sm text-retro-gray-500">Generate secure random passwords</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Generated Password Display -->
          <div class="mb-6">
            <label class="label-retro">Generated Password</label>
            <div class="flex gap-3">
              <input 
                type="text" 
                :value="password"
                readonly
                class="input-retro flex-1 font-mono text-lg tracking-wide"
              />
              <button 
                @click="copyToClipboard"
                class="btn-retro px-4 min-w-[80px]"
                :class="{ 'bg-retro-mint': copied }"
              >
                {{ copied ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
          </div>

          <!-- Strength Indicator -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-2">
              <span class="font-display text-sm text-retro-gray-600 tracking-wider">STRENGTH</span>
              <span class="font-body text-sm text-retro-gray-600">{{ strengthLabel.label }}</span>
            </div>
            <div class="h-2 bg-retro-gray-100 rounded-full overflow-hidden flex gap-1">
              <div 
                v-for="i in 5" 
                :key="i"
                class="flex-1 rounded-full transition-colors"
                :class="i <= strengthScore ? strengthLabel.color : 'bg-retro-gray-200'"
              ></div>
            </div>
          </div>

          <!-- Options -->
          <div class="space-y-5 mb-8">
            <!-- Length -->
            <div>
              <label class="label-retro">
                Length: {{ length }}
              </label>
              <input 
                type="range" 
                v-model.number="length"
                min="4"
                max="64"
                class="w-full h-2 bg-retro-gray-200 rounded-lg appearance-none cursor-pointer accent-retro-gray-600"
              />
              <div class="flex justify-between text-xs text-retro-gray-400 font-body mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <!-- Checkboxes -->
            <div class="grid grid-cols-2 gap-4">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="includeUppercase"
                  class="w-5 h-5 rounded border-2 border-retro-gray-300 text-retro-gray-600 focus:ring-retro-gray-400"
                />
                <span class="font-body text-sm text-retro-gray-600 group-hover:text-retro-gray-800">Uppercase (A-Z)</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="includeLowercase"
                  class="w-5 h-5 rounded border-2 border-retro-gray-300 text-retro-gray-600 focus:ring-retro-gray-400"
                />
                <span class="font-body text-sm text-retro-gray-600 group-hover:text-retro-gray-800">Lowercase (a-z)</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="includeNumbers"
                  class="w-5 h-5 rounded border-2 border-retro-gray-300 text-retro-gray-600 focus:ring-retro-gray-400"
                />
                <span class="font-body text-sm text-retro-gray-600 group-hover:text-retro-gray-800">Numbers (0-9)</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  v-model="includeSymbols"
                  class="w-5 h-5 rounded border-2 border-retro-gray-300 text-retro-gray-600 focus:ring-retro-gray-400"
                />
                <span class="font-body text-sm text-retro-gray-600 group-hover:text-retro-gray-800">Symbols (!@#$%)</span>
              </label>
            </div>
          </div>

          <!-- Generate Button -->
          <button 
            @click="generatePassword"
            class="btn-retro-primary w-full py-3 text-center"
          >
            <span class="font-display text-lg tracking-wider">🎲 GENERATE NEW PASSWORD</span>
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
