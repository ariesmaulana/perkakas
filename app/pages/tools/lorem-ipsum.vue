<script setup>
/**
 * Lorem Ipsum Generator Tool
 * Generate configurable placeholder text
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const outputType = ref('paragraphs')

/** @type {import('vue').Ref<number>} */
const count = ref(3)

/** @type {import('vue').Ref<string>} */
const generatedText = ref('')

/** @type {import('vue').Ref<boolean>} */
const copied = ref(false)

// Lorem ipsum word bank
const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'voluptatem', 'accusantium', 'doloremque',
  'laudantium', 'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo',
  'inventore', 'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta',
  'explicabo', 'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'aut', 'odit',
  'fugit', 'consequuntur', 'magni', 'dolores', 'eos', 'ratione', 'sequi', 'nesciunt'
]

/**
 * Gets random word from bank
 * @returns {string}
 */
function getRandomWord() {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return words[array[0] % words.length]
}

/**
 * Generates a random sentence
 * @param {boolean} capitalize - Capitalize first letter
 * @returns {string}
 */
function generateSentence(capitalize = true) {
  const length = 8 + Math.floor(Math.random() * 10) // 8-17 words
  const sentenceWords = []
  
  for (let i = 0; i < length; i++) {
    sentenceWords.push(getRandomWord())
  }
  
  let sentence = sentenceWords.join(' ')
  if (capitalize) {
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1)
  }
  return sentence + '.'
}

/**
 * Generates a paragraph
 * @returns {string}
 */
function generateParagraph() {
  const sentenceCount = 4 + Math.floor(Math.random() * 4) // 4-7 sentences
  const sentences = []
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence())
  }
  
  return sentences.join(' ')
}

/**
 * Generates words
 * @param {number} wordCount
 * @returns {string}
 */
function generateWords(wordCount) {
  const result = []
  for (let i = 0; i < wordCount; i++) {
    result.push(getRandomWord())
  }
  return result.join(' ')
}

/**
 * Main generate function
 */
function generate() {
  let result = ''
  
  if (outputType.value === 'paragraphs') {
    const paragraphs = []
    for (let i = 0; i < count.value; i++) {
      paragraphs.push(generateParagraph())
    }
    result = paragraphs.join('\n\n')
  } else if (outputType.value === 'sentences') {
    const sentences = []
    for (let i = 0; i < count.value; i++) {
      sentences.push(generateSentence())
    }
    result = sentences.join(' ')
  } else if (outputType.value === 'words') {
    result = generateWords(count.value)
  }
  
  // Always start with "Lorem ipsum dolor sit amet"
  if (result.length > 0) {
    const loremStart = 'Lorem ipsum dolor sit amet'
    if (outputType.value === 'words') {
      const wordsArr = result.split(' ')
      const loremWords = loremStart.toLowerCase().split(' ')
      for (let i = 0; i < Math.min(loremWords.length, wordsArr.length); i++) {
        wordsArr[i] = loremWords[i]
      }
      result = wordsArr.join(' ')
    } else {
      result = loremStart + result.slice(result.indexOf(' ', 20) || 26)
    }
  }
  
  generatedText.value = result
}

/**
 * Copies text to clipboard
 */
async function copyToClipboard() {
  if (!generatedText.value) return
  
  try {
    await navigator.clipboard.writeText(generatedText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Generate initial text
generate()
</script>

<template>
  <NuxtLayout>
    <div class="py-8 sm:py-12">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Back link -->
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-retro-gray-500 hover:text-retro-gray-700 mb-8 font-body text-sm transition-colors">
          <span>←</span>
          <span>Back to Tools</span>
        </NuxtLink>

        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 bg-retro-lavender border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">📄</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">LOREM IPSUM</h1>
              <p class="font-body text-sm text-retro-gray-500">Generate placeholder text</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Options -->
          <div class="flex flex-wrap items-end gap-4 mb-6">
            <!-- Type -->
            <div>
              <label class="label-retro">Generate</label>
              <select v-model="outputType" class="input-retro">
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            
            <!-- Count -->
            <div>
              <label class="label-retro">Count</label>
              <input 
                type="number" 
                v-model.number="count" 
                min="1" 
                max="100"
                class="input-retro w-24"
              />
            </div>

          </div>

          <!-- Generate Button -->
          <div class="flex gap-3 mb-6">
            <button 
              @click="generate"
              class="btn-retro-primary py-2"
            >
              <span class="font-display tracking-wide">✨ GENERATE</span>
            </button>
            <button 
              @click="copyToClipboard"
              class="btn-retro py-2"
              :class="{ 'bg-retro-mint': copied }"
              :disabled="!generatedText"
            >
              {{ copied ? '✓ Copied' : 'Copy' }}
            </button>
          </div>

          <!-- Output -->
          <div>
            <label class="label-retro">Output</label>
            <div 
              class="input-retro w-full p-4 font-body text-sm text-retro-gray-700 bg-retro-gray-50 overflow-auto whitespace-pre-wrap"
              style="min-height: 200px; max-height: 400px;"
            >
              {{ generatedText || 'Click Generate to create Lorem Ipsum text...' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
