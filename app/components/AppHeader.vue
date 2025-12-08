<script setup>
/**
 * AppHeader component - Site header with logo and navigation
 * @component
 */
</script>

<template>
  <header class="border-b-2 border-retro-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 bg-retro-mint border-2 border-retro-gray-300 rounded-retro shadow-retro flex items-center justify-center group-hover:bg-retro-sky transition-colors">
            <span class="font-display text-2xl text-retro-gray-700">🔧</span>
          </div>
          <div>
            <h1 class="font-display text-2xl text-retro-gray-800 tracking-wider">PERKAKAS</h1>
            <p class="font-body text-xs text-retro-gray-500 -mt-1">Just in case utilities</p>
          </div>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-2">
          <NuxtLink 
            to="/" 
            class="btn-retro text-retro-gray-600 hover:text-retro-gray-800"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/tools" 
            class="btn-retro text-retro-gray-600 hover:text-retro-gray-800"
          >
            All Tools
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
