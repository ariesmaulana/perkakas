<script setup>
/**
 * Text Diff Tool
 * Compare two texts and highlight differences
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const textA = ref('')

/** @type {import('vue').Ref<string>} */
const textB = ref('')

/** @type {import('vue').Ref<Array>} */
const diffResult = ref([])

/** @type {import('vue').Ref<boolean>} */
const showDiff = ref(false)

/**
 * Simple diff algorithm - compares lines
 */
function computeDiff() {
  if (!textA.value && !textB.value) {
    diffResult.value = []
    showDiff.value = false
    return
  }

  const linesA = textA.value.split('\n')
  const linesB = textB.value.split('\n')
  const maxLen = Math.max(linesA.length, linesB.length)
  const result = []

  for (let i = 0; i < maxLen; i++) {
    const lineA = linesA[i] ?? ''
    const lineB = linesB[i] ?? ''
    
    if (lineA === lineB) {
      result.push({ type: 'same', lineA, lineB, lineNum: i + 1 })
    } else if (!lineA && lineB) {
      result.push({ type: 'added', lineA: '', lineB, lineNum: i + 1 })
    } else if (lineA && !lineB) {
      result.push({ type: 'removed', lineA, lineB: '', lineNum: i + 1 })
    } else {
      result.push({ type: 'changed', lineA, lineB, lineNum: i + 1 })
    }
  }

  diffResult.value = result
  showDiff.value = true
}

/**
 * Clears both inputs and results
 */
function clearAll() {
  textA.value = ''
  textB.value = ''
  diffResult.value = []
  showDiff.value = false
}

/**
 * Loads sample text for demo
 */
function loadSample() {
  textA.value = `Hello World
This is line two
This line will be removed
Same content here
Another same line`

  textB.value = `Hello World
This is line TWO modified
Same content here
Another same line
This line was added`
}

/** Stats computed */
const stats = computed(() => {
  const same = diffResult.value.filter(d => d.type === 'same').length
  const added = diffResult.value.filter(d => d.type === 'added').length
  const removed = diffResult.value.filter(d => d.type === 'removed').length
  const changed = diffResult.value.filter(d => d.type === 'changed').length
  return { same, added, removed, changed }
})
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
            <div class="w-14 h-14 bg-retro-cream border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">📝</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">TEXT DIFF</h1>
              <p class="font-body text-sm text-retro-gray-500">Compare two texts and find differences</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Controls -->
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div class="flex flex-wrap items-center gap-3">
              <button 
                @click="computeDiff"
                class="btn-retro-primary py-2"
              >
                <span class="font-display tracking-wide">🔍 COMPARE</span>
              </button>
            </div>
            
            <div class="flex flex-wrap items-center gap-3">
              <button @click="loadSample" class="btn-retro text-xs">
                Sample
              </button>
              
              <button @click="clearAll" class="btn-retro text-xs">
                Clear
              </button>
            </div>
          </div>

          <!-- Side by Side Inputs -->
          <div class="flex flex-row gap-4 mb-6">
            <!-- Text A Panel -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1.5 h-8">
                <label class="font-display text-lg text-retro-gray-600 uppercase tracking-wider">Original Text</label>
              </div>
              <textarea 
                v-model="textA"
                placeholder="Enter original text here..."
                class="input-retro w-full font-mono text-sm resize-none overflow-auto"
                style="height: 300px;"
              ></textarea>
            </div>

            <!-- Text B Panel -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1.5 h-8">
                <label class="font-display text-lg text-retro-gray-600 uppercase tracking-wider">Modified Text</label>
              </div>
              <textarea 
                v-model="textB"
                placeholder="Enter modified text here..."
                class="input-retro w-full font-mono text-sm resize-none overflow-auto"
                style="height: 300px;"
              ></textarea>
            </div>
          </div>

          <!-- Diff Results - Unified Format -->
          <div v-if="showDiff" class="mt-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-display text-xl text-retro-gray-800 tracking-wider">UNIFIED DIFF</h3>
              <div class="flex gap-4 font-body text-xs">
                <span class="text-retro-gray-500">Unchanged: {{ stats.same }}</span>
                <span class="text-green-600">Added: {{ stats.added }}</span>
                <span class="text-red-600">Removed: {{ stats.removed }}</span>
                <span class="text-amber-600">Modified: {{ stats.changed }}</span>
              </div>
            </div>

            <div class="border-2 border-retro-gray-200 rounded-retro overflow-hidden font-mono text-sm">
              <template v-for="line in diffResult" :key="line.lineNum">
                <!-- Removed line (for changed, show old first) -->
                <div 
                  v-if="line.type === 'removed' || line.type === 'changed'"
                  class="flex border-b border-retro-gray-100"
                >
                  <div class="w-12 shrink-0 px-2 py-1.5 bg-red-100 text-red-600 text-xs text-center border-r border-retro-gray-200">
                    {{ line.lineNum }}
                  </div>
                  <div class="flex-1 px-3 py-1.5 bg-red-50 text-red-800">
                    <span class="text-red-500 mr-2">-</span>{{ line.lineA }}
                  </div>
                </div>

                <!-- Added line (for changed, show new after old) -->
                <div 
                  v-if="line.type === 'added' || line.type === 'changed'"
                  class="flex border-b border-retro-gray-100"
                >
                  <div class="w-12 shrink-0 px-2 py-1.5 bg-green-100 text-green-600 text-xs text-center border-r border-retro-gray-200">
                    {{ line.lineNum }}
                  </div>
                  <div class="flex-1 px-3 py-1.5 bg-green-50 text-green-800">
                    <span class="text-green-500 mr-2">+</span>{{ line.lineB }}
                  </div>
                </div>

                <!-- Unchanged line -->
                <div 
                  v-if="line.type === 'same'"
                  class="flex border-b border-retro-gray-100 last:border-b-0"
                >
                  <div class="w-12 shrink-0 px-2 py-1.5 bg-retro-gray-100 text-retro-gray-400 text-xs text-center border-r border-retro-gray-200">
                    {{ line.lineNum }}
                  </div>
                  <div class="flex-1 px-3 py-1.5 bg-retro-gray-50 text-retro-gray-600">
                    <span class="text-retro-gray-400 mr-2">&nbsp;</span>{{ line.lineA }}
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
