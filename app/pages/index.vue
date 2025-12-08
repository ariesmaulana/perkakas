<script setup>
/**
 * Home page - Displays hero section and grid of tool cards (max 6)
 * @component
 */
import { ref, computed } from 'vue'
import { tools, categories, filterTools } from '~/data/tools.js'

/** @type {import('vue').Ref<string>} */
const selectedCategory = ref('all')

/** @type {import('vue').ComputedRef<Array>} */
const filteredTools = computed(() => {
  return filterTools(tools, selectedCategory.value, '').slice(0, 6)
})

/** @type {import('vue').ComputedRef<number>} */
const totalTools = computed(() => tools.length)
</script>

<template>
  <NuxtLayout>
    <!-- Hero Section -->
    <section class="py-16 sm:py-24 border-b-2 border-retro-gray-200 bg-white/40">
      <div class="max-w-6xl mx-auto px-4 text-center">    
        <h1 class="font-display text-5xl sm:text-7xl text-retro-gray-800 mb-4 tracking-wider">
          PERKAKAS
        </h1>
        
        <p class="font-body text-lg sm:text-xl text-retro-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          A collection of handy utility tools for daily use
        </p>

        <div class="flex items-center justify-center gap-4 flex-wrap mb-8">
          <a href="#tools" class="btn-retro-primary">
            <span class="font-display tracking-wide">EXPLORE TOOLS</span>
          </a>
          <span class="font-body text-sm text-retro-gray-400">{{ totalTools }} tools available</span>
        </div>

      </div>
    </section>

    <!-- Tools Grid -->
    <section id="tools" class="py-12 sm:py-16">
      <div class="max-w-6xl mx-auto px-4">
        <div class="mb-8">
          <h2 class="font-display text-2xl text-retro-gray-700 tracking-wider">FEATURED TOOLS</h2>
          <div class="w-16 h-1 bg-retro-gray-300 mt-2"></div>
        </div>

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
        <div v-else class="text-center py-12">
          <p class="font-display text-xl text-retro-gray-400 tracking-wider mb-2">NO TOOLS FOUND</p>
          <p class="font-body text-sm text-retro-gray-400">Try adjusting your search or filter</p>
        </div>

        <!-- View All Link -->
        <div v-if="tools.length > 6" class="text-center mt-8">
          <NuxtLink to="/tools" class="btn-retro-primary">
            <span class="font-display tracking-wide">VIEW ALL TOOLS →</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
