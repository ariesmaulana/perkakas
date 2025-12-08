<script setup>
/**
 * ToolCard component - Reusable card for displaying tools
 * @component
 * @prop {string} title - Tool title
 * @prop {string} description - Short tool description
 * @prop {string} icon - Emoji icon for the tool
 * @prop {string} link - Route to the tool page
 * @prop {string} [color='mint'] - Card accent color (mint, lavender, pink, sky, peach, butter)
 */
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'mint'
  }
})

const colorClasses = {
  mint: 'bg-retro-mint',
  lavender: 'bg-retro-lavender',
  pink: 'bg-retro-pink',
  sky: 'bg-retro-sky',
  peach: 'bg-retro-peach',
  butter: 'bg-retro-butter'
}
</script>

<template>
  <NuxtLink 
    :to="link" 
    class="card-retro block p-5 group"
  >
    <!-- Icon -->
    <div 
      class="w-14 h-14 rounded-retro border-2 border-retro-gray-200 flex items-center justify-center mb-4 transition-colors"
      :class="colorClasses[color] || colorClasses.mint"
    >
      <span class="text-2xl">{{ icon }}</span>
    </div>

    <!-- Content -->
    <h3 class="font-display text-xl text-retro-gray-800 mb-1 tracking-wide group-hover:text-retro-gray-900">
      {{ title }}
    </h3>
    <p class="font-body text-sm text-retro-gray-500 leading-relaxed">
      {{ description }}
    </p>

    <!-- Arrow indicator -->
    <div class="mt-4 flex items-center text-retro-gray-400 group-hover:text-retro-gray-600 transition-colors">
      <span class="font-display text-sm tracking-wider">OPEN</span>
      <span class="ml-2 transition-transform group-hover:translate-x-1">→</span>
    </div>
  </NuxtLink>
</template>
