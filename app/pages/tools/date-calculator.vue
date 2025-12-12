<script setup>
/**
 * Date Calculator Tool
 * Calculate a date N days from a selected date
 * @component
 */
import { ref, computed, watch } from 'vue'

/**
 * Formats date to YYYY-MM-DD for input
 * @param {Date} date
 * @returns {string}
 */
function formatDateForInput(date) {
  return date.toISOString().split('T')[0]
}

/**
 * Formats date to readable format
 * @param {Date} date
 * @returns {string}
 */
function formatReadableDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/** @type {import('vue').Ref<string>} */
const startDate = ref(formatDateForInput(new Date()))

/** @type {import('vue').Ref<number>} */
const daysToAdd = ref(7)

/** @type {import('vue').Ref<string>} */
const direction = ref('add') // 'add' or 'subtract'

/** Computed result date */
const resultDate = computed(() => {
  const start = new Date(startDate.value)
  const days = direction.value === 'add' ? daysToAdd.value : -daysToAdd.value
  const result = new Date(start)
  result.setDate(result.getDate() + days)
  return result
})

/** Formatted result */
const formattedResult = computed(() => {
  return formatReadableDate(resultDate.value)
})

/** Result date for input format */
const resultDateString = computed(() => {
  return formatDateForInput(resultDate.value)
})

/**
 * Sets start date to today
 */
function setToday() {
  startDate.value = formatDateForInput(new Date())
}

/** Quick add presets */
const presets = [
  { label: '1 Week', days: 7 },
  { label: '2 Weeks', days: 14 },
  { label: '1 Month', days: 30 },
  { label: '3 Months', days: 90 },
  { label: '6 Months', days: 180 },
  { label: '1 Year', days: 365 }
]

/**
 * Apply a preset
 * @param {number} days
 */
function applyPreset(days) {
  daysToAdd.value = days
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
            <div class="w-14 h-14 bg-retro-mint border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">🗓️</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">DATE CALCULATOR</h1>
              <p class="font-body text-sm text-retro-gray-500">Calculate N days from a date</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Start Date -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <label class="label-retro">Start Date</label>
              <button @click="setToday" class="btn-retro text-xs">Today</button>
            </div>
            <input 
              type="date"
              v-model="startDate"
              class="input-retro w-full"
            />
          </div>

          <!-- Direction -->
          <div class="mb-6">
            <label class="label-retro">Direction</label>
            <div class="flex gap-2 mt-2">
              <button 
                @click="direction = 'add'"
                class="btn-retro flex-1 py-2"
                :class="{ 'bg-retro-mint': direction === 'add' }"
              >
                + Add Days
              </button>
              <button 
                @click="direction = 'subtract'"
                class="btn-retro flex-1 py-2"
                :class="{ 'bg-retro-pink': direction === 'subtract' }"
              >
                − Subtract Days
              </button>
            </div>
          </div>

          <!-- Days Input -->
          <div class="mb-6">
            <label class="label-retro">Number of Days</label>
            <input 
              type="number"
              v-model.number="daysToAdd"
              min="0"
              max="36500"
              class="input-retro w-full text-2xl font-display text-center py-4"
            />
          </div>

          <!-- Quick Presets -->
          <div class="mb-8">
            <label class="label-retro mb-3 block">Quick Presets</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="preset in presets"
                :key="preset.days"
                @click="applyPreset(preset.days)"
                class="btn-retro text-xs"
                :class="{ 'bg-retro-butter': daysToAdd === preset.days }"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>

          <!-- Result -->
          <div class="p-6 bg-retro-gray-50 border-2 border-retro-gray-200 rounded-retro">
            <p class="font-display text-lg text-retro-gray-500 mb-2 text-center">
              {{ direction === 'add' ? 'RESULT DATE' : 'RESULT DATE' }}
            </p>
            <p class="font-display text-3xl text-retro-gray-800 text-center tracking-wider mb-2">
              {{ formattedResult }}
            </p>
            <p class="font-body text-sm text-retro-gray-500 text-center">
              {{ daysToAdd }} days {{ direction === 'add' ? 'after' : 'before' }} {{ formatReadableDate(new Date(startDate)) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
