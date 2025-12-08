<script setup>
/**
 * Days Counter Tool
 * Calculate the number of days between two dates
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const startDate = ref(new Date().toISOString().split('T')[0])

/** @type {import('vue').Ref<string>} */
const endDate = ref('')

/** @type {import('vue').Ref<'between' | 'until' | 'since'>} */
const mode = ref('between')

/** @type {import('vue').Ref<boolean>} */
const includeFirstDay = ref(false)

/**
 * Formats a date string to a more readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

/** @type {import('vue').ComputedRef<number|null>} */
const daysDifference = computed(() => {
  if (!startDate.value || !endDate.value) return null
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  const diffTime = end.getTime() - start.getTime()
  let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
  
  // Add 1 if including the first day
  if (includeFirstDay.value) {
    diffDays = diffDays >= 0 ? diffDays + 1 : diffDays - 1
  }
  
  return diffDays
})

/** @type {import('vue').ComputedRef<number|null>} */
const weeksDifference = computed(() => {
  if (daysDifference.value === null) return null
  return Math.floor(Math.abs(daysDifference.value) / 7)
})

/** @type {import('vue').ComputedRef<number|null>} */
const monthsDifference = computed(() => {
  if (!startDate.value || !endDate.value) return null
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  let months = (end.getFullYear() - start.getFullYear()) * 12
  months += end.getMonth() - start.getMonth()
  
  return Math.abs(months)
})

/** @type {import('vue').ComputedRef<boolean>} */
const isPast = computed(() => {
  if (daysDifference.value === null) return false
  return daysDifference.value < 0
})

/**
 * Gets the first day of the current month
 * @returns {string} ISO date string
 */
function getStartOfMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
}

/**
 * Gets the last day of the current month
 * @returns {string} ISO date string
 */
function getEndOfMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
}

/** @type {import('vue').Ref<Array<{name: string, date: string}>>} */
const presets = ref([
  { name: 'New Year', date: `${new Date().getFullYear() + 1}-01-01` },
  { name: 'Start of Month', date: getStartOfMonth() },
  { name: 'End of Month', date: getEndOfMonth() },
  { name: 'Next Week', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }
])

/**
 * Sets the end date to a preset value
 * @param {string} date - ISO date string
 */
function usePreset(date) {
  startDate.value = new Date().toISOString().split('T')[0]
  endDate.value = date
}

/**
 * Swaps start and end dates
 */
function swapDates() {
  const temp = startDate.value
  startDate.value = endDate.value
  endDate.value = temp
}
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
            <div class="w-14 h-14 bg-retro-lavender border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">📅</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">DAYS COUNTER</h1>
              <p class="font-body text-sm text-retro-gray-500">Calculate days between dates</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Presets -->
          <div class="mb-6">
            <label class="label-retro">Quick Presets</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="preset in presets"
                :key="preset.name"
                @click="usePreset(preset.date)"
                class="btn-retro text-xs"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>

          <!-- Date Inputs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label class="label-retro">Start Date</label>
              <input 
                type="date"
                v-model="startDate"
                class="input-retro w-full"
              />
              <p v-if="startDate" class="mt-1 text-xs text-retro-gray-400 font-body">
                {{ formatDate(startDate) }}
              </p>
            </div>

            <div>
              <label class="label-retro">End Date</label>
              <input 
                type="date"
                v-model="endDate"
                class="input-retro w-full"
              />
              <p v-if="endDate" class="mt-1 text-xs text-retro-gray-400 font-body">
                {{ formatDate(endDate) }}
              </p>
            </div>
          </div>

          <!-- Options -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                v-model="includeFirstDay"
                class="w-5 h-5 rounded border-2 border-retro-gray-300 text-retro-gray-600 focus:ring-retro-gray-400"
              />
              <span class="font-body text-sm text-retro-gray-600 group-hover:text-retro-gray-800">Include first day</span>
            </label>
            
            <button 
              @click="swapDates"
              class="btn-retro text-sm"
              :disabled="!startDate || !endDate"
            >
              ⇄ Swap Dates
            </button>
          </div>

          <!-- Results -->
          <div v-if="daysDifference !== null" class="bg-retro-gray-50 border-2 border-retro-gray-200 rounded-retro p-6">
            <div class="text-center mb-6">
              <p class="font-display text-sm text-retro-gray-500 tracking-wider mb-2">
                {{ isPast ? 'DAYS AGO' : 'DAYS REMAINING' }}
              </p>
              <p class="font-display text-6xl sm:text-7xl text-retro-gray-800 tracking-wider">
                {{ Math.abs(daysDifference) }}
              </p>
              <p class="font-body text-sm text-retro-gray-500 mt-2">
                {{ Math.abs(daysDifference) === 1 ? 'day' : 'days' }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="bg-white border-2 border-retro-gray-200 rounded-retro p-4">
                <p class="font-display text-2xl text-retro-gray-700">{{ weeksDifference }}</p>
                <p class="font-body text-xs text-retro-gray-500 mt-1">weeks</p>
              </div>
              <div class="bg-white border-2 border-retro-gray-200 rounded-retro p-4">
                <p class="font-display text-2xl text-retro-gray-700">{{ monthsDifference }}</p>
                <p class="font-body text-xs text-retro-gray-500 mt-1">months</p>
              </div>
            </div>

            <p class="text-center mt-4 font-body text-sm text-retro-gray-400">
              From {{ formatDate(startDate) }}<br />
              {{ isPast ? 'to' : 'until' }} {{ formatDate(endDate) }}
            </p>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-retro-gray-50 border-2 border-retro-gray-200 border-dashed rounded-retro p-8 text-center">
            <p class="font-display text-xl text-retro-gray-400 tracking-wider mb-2">SELECT DATES</p>
            <p class="font-body text-sm text-retro-gray-400">Choose a start and end date to calculate the difference</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
