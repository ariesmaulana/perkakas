<script setup>
/**
 * JSON Prettify Tool
 * Format and beautify JSON data with validation
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const inputJson = ref('')

/** @type {import('vue').Ref<string>} */
const outputJson = ref('')

/** @type {import('vue').Ref<string|null>} */
const error = ref(null)

/** @type {import('vue').Ref<number>} */
const indentSize = ref(2)

/** @type {import('vue').Ref<boolean>} */
const copied = ref(false)

/**
 * Formats the input JSON with proper indentation
 */
function prettifyJson() {
  error.value = null
  outputJson.value = ''
  
  if (!inputJson.value.trim()) {
    error.value = 'Please enter some JSON to format'
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed, null, indentSize.value)
  } catch (err) {
    error.value = `Invalid JSON: ${err.message}`
  }
}

/**
 * Minifies the JSON (removes all whitespace)
 */
function minifyJson() {
  error.value = null
  outputJson.value = ''
  
  if (!inputJson.value.trim()) {
    error.value = 'Please enter some JSON to minify'
    return
  }
  
  try {
    const parsed = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(parsed)
  } catch (err) {
    error.value = `Invalid JSON: ${err.message}`
  }
}

/**
 * Copies the output to clipboard
 */
async function copyToClipboard() {
  if (!outputJson.value) return
  
  try {
    await navigator.clipboard.writeText(outputJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

/**
 * Clears both input and output
 */
function clearAll() {
  inputJson.value = ''
  outputJson.value = ''
  error.value = null
}

/**
 * Loads a sample JSON for demonstration
 */
function loadSample() {
  inputJson.value = JSON.stringify({
    name: "Perkakas",
    version: "1.0.0",
    description: "Retro Utility Toolbox",
    tools: ["Password Generator", "Days Counter", "JSON Prettify"],
    config: {
      theme: "retro",
      colors: { primary: "#D4E8E0", secondary: "#E5D8ED" }
    }
  })
}
</script>

<template>
  <NuxtLayout>
    <div class="py-8 sm:py-12">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-retro-gray-500 hover:text-retro-gray-700 mb-8 font-body text-sm transition-colors">
          <span>←</span>
          <span>Back to Tools</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 bg-retro-sky border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">📋</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">JSON PRETTIFY</h1>
              <p class="font-body text-sm text-retro-gray-500">Format and beautify JSON data</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Controls -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div class="flex flex-wrap items-center gap-3">
              <button 
                @click="prettifyJson"
                class="btn-retro-primary py-2"
              >
                <span class="font-display tracking-wide">✨ PRETTIFY</span>
              </button>
              <button 
                @click="minifyJson"
                class="btn-retro py-2"
              >
                <span class="font-display tracking-wide">📦 MINIFY</span>
              </button>
            </div>
            
            <div class="flex flex-wrap items-center gap-3">
              <div class="flex items-center gap-2">
                <label class="font-display text-sm text-retro-gray-600">INDENT:</label>
                <select 
                  v-model.number="indentSize"
                  class="input-retro text-sm py-1"
                >
                  <option :value="2">2 spaces</option>
                  <option :value="4">4 spaces</option>
                </select>
              </div>
              
              <button @click="loadSample" class="btn-retro text-xs">
                Sample
              </button>
              
              <button @click="clearAll" class="btn-retro text-xs">
                Clear
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="mb-4 p-4 bg-retro-pink border-2 border-retro-gray-300 rounded-retro">
            <p class="font-body text-sm text-retro-gray-700">{{ error }}</p>
          </div>

          <!-- Side by Side Panels -->
          <div class="flex flex-row gap-4">
            <!-- Input Panel -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1.5 h-8">
                <label class="font-display text-lg text-retro-gray-600 uppercase tracking-wider">Input JSON</label>
              </div>
              <textarea 
                v-model="inputJson"
                placeholder='{"key": "value"}'
                class="input-retro w-full font-mono text-sm resize-none overflow-y-auto"
                style="height: 400px;"
              ></textarea>
            </div>

            <!-- Output Panel -->
            <div class="flex-1 min-w-0 overflow-hidden">
              <div class="flex items-center justify-between mb-1.5 h-8">
                <label class="font-display text-lg text-retro-gray-600 uppercase tracking-wider">Output</label>
                <button 
                  v-if="outputJson"
                  @click="copyToClipboard"
                  class="btn-retro text-xs"
                  :class="{ 'bg-retro-mint': copied }"
                >
                  {{ copied ? '✓ Copied' : 'Copy' }}
                </button>
              </div>
              <div 
                class="input-retro w-full p-3 font-mono text-sm bg-retro-gray-50"
                style="height: 400px; overflow: auto;"
                :class="{ 'text-retro-gray-400': !outputJson }"
              >
                <pre class="whitespace-pre m-0 w-max">{{ outputJson || 'Output will appear here...' }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
