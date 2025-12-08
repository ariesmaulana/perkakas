<script setup>
/**
 * Default layout - Main app layout with header and footer
 * @component
 */
</script>

<template>
  <div class="min-h-screen flex flex-col bg-grid">
    <AppHeader />
    
    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t-2 border-retro-gray-200 bg-white/60 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-4 py-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="font-display text-sm text-retro-gray-500 tracking-wider">
            arsmp.com © 2025 PERKAKAS
          </p>
          <p class="font-body text-xs text-retro-gray-400">
            
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
