<script setup>
/**
 * Tools List Page - Displays all tools with filtering
 * @component
 */
import { ref, computed } from 'vue'
import { tools, categories, filterTools } from '~/data/tools.js'

/** @type {import('vue').Ref<string>} */
const selectedCategory = ref('all')

/** @type {import('vue').Ref<string>} */
const searchQuery = ref('')

/** @type {import('vue').ComputedRef<Array>} */
const filteredTools = computed(() => {
  return filterTools(tools, selectedCategory.value, searchQuery.value)
})
</script>

<template>
  <NuxtLayout>
    <div class="py-8 sm:py-12">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-retro-gray-500 hover:text-retro-gray-700 mb-8 font-body text-sm transition-colors">
          <span>←</span>
          <span>Back to Home</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider mb-2">ALL TOOLS</h1>
          <p class="font-body text-retro-gray-500">Browse our complete collection of {{ tools.length }} utility tools</p>
        </div>

        <!-- Filters -->
        <div class="card-retro p-4 mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Search -->
            <div class="flex-1">
              <label class="label-retro">Search</label>
              <input 
                type="text"
                v-model="searchQuery"
                placeholder="Search by name or description..."
                class="input-retro w-full"
              />
            </div>

            <!-- Category Filter -->
            <div>
              <label class="label-retro">Category</label>
              <div class="flex gap-1 flex-wrap">
                <button 
                  v-for="cat in categories"
                  :key="cat"
                  @click="selectedCategory = cat"
                  class="btn-retro text-sm capitalize"
                  :class="{ 'bg-retro-mint': selectedCategory === cat }"
                >
                  {{ cat }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <p class="font-body text-sm text-retro-gray-500 mb-4">
          Showing {{ filteredTools.length }} of {{ tools.length }} tools
        </p>

        <!-- Tools Grid -->
        <div v-if="filteredTools.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            v-for="tool in filteredTools"
            :key="tool.link"
            :title="tool.title"
            :description="tool.description"
            :icon="tool.icon"
            :link="tool.link"
            :color="tool.color"
          />
        </div>

        <!-- No Results -->
        <div v-else class="card-retro p-12 text-center">
          <p class="font-display text-2xl text-retro-gray-400 tracking-wider mb-2">NO TOOLS FOUND</p>
          <p class="font-body text-sm text-retro-gray-400 mb-4">Try adjusting your search or filter</p>
          <button 
            @click="searchQuery = ''; selectedCategory = 'all'"
            class="btn-retro"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
