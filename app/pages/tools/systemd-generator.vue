<script setup>
/**
 * Systemd Generator Tool
 * Generate systemd service files and commands
 * @component
 */
import { ref, computed } from 'vue'

/** @type {import('vue').Ref<string>} */
const serviceName = ref('')

/** @type {import('vue').Ref<string>} */
const execCommand = ref('')

/** @type {import('vue').Ref<string>} */
const workingDirectory = ref('')

/** @type {import('vue').Ref<string>} */
const user = ref('')

/** @type {import('vue').Ref<string>} */
const group = ref('')

/** @type {import('vue').Ref<string>} */
const description = ref('')

/** @type {import('vue').Ref<boolean>} */
const generated = ref(false)

/** @type {import('vue').Ref<boolean>} */
const copiedService = ref(false)

/** @type {import('vue').Ref<boolean>} */
const copiedCommands = ref(false)

/**
 * Computed service file name
 */
const serviceFileName = computed(() => {
  if (!serviceName.value) return ''
  return `${serviceName.value}.service`
})

/**
 * Generates the systemd service file content
 */
const serviceContent = computed(() => {
  if (!serviceName.value || !execCommand.value) return ''
  
  const desc = description.value || serviceName.value
  const workDir = workingDirectory.value || ''
  const userName = user.value || '[your username]'
  const groupName = group.value || '[your group]'
  
  let content = `[Unit]
Description=${desc}

[Service]
ExecStart=${execCommand.value}
Restart=always`

  if (workDir) {
    content += `\nWorkingDirectory=${workDir}`
  }

  content += `
User=${userName}
Group=${groupName}

[Install]
WantedBy=multi-user.target`

  return content
})

/**
 * Generates commands to manage the service
 */
const serviceCommands = computed(() => {
  if (!serviceFileName.value) return ''
  
  return `# Copy the service file to systemd directory
sudo cp ${serviceFileName.value} /etc/systemd/system/

# Reload systemd to recognize the new service
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable ${serviceFileName.value}

# Start the service
sudo systemctl start ${serviceFileName.value}

# Check service status
sudo systemctl status ${serviceFileName.value}

# View service logs
sudo journalctl -u ${serviceFileName.value} -f`
})

/**
 * Validates and generates the service file
 */
function generateService() {
  if (!serviceName.value.trim()) {
    alert('Please enter a service name')
    return
  }
  
  if (!execCommand.value.trim()) {
    alert('Please enter an execution command')
    return
  }
  
  generated.value = true
  copiedService.value = false
  copiedCommands.value = false
}

/**
 * Copies the service file content to clipboard
 */
async function copyServiceFile() {
  if (!serviceContent.value) return
  
  try {
    await navigator.clipboard.writeText(serviceContent.value)
    copiedService.value = true
    setTimeout(() => {
      copiedService.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

/**
 * Copies the service commands to clipboard
 */
async function copyCommands() {
  if (!serviceCommands.value) return
  
  try {
    await navigator.clipboard.writeText(serviceCommands.value)
    copiedCommands.value = true
    setTimeout(() => {
      copiedCommands.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

/**
 * Resets the form
 */
function resetForm() {
  serviceName.value = ''
  execCommand.value = ''
  workingDirectory.value = ''
  user.value = ''
  group.value = ''
  description.value = ''
  generated.value = false
  copiedService.value = false
  copiedCommands.value = false
}

/**
 * Loads a sample configuration
 */
function loadSample() {
  serviceName.value = 'my-web-app'
  execCommand.value = '/usr/bin/npm run start'
  workingDirectory.value = '/home/user/my-web-app'
  user.value = 'www-data'
  group.value = 'www-data'
  description.value = 'My Web Application'
  generated.value = false
}
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
            <div class="w-14 h-14 bg-retro-sky border-2 border-retro-gray-200 rounded-retro shadow-retro flex items-center justify-center">
              <span class="text-2xl">⚙️</span>
            </div>
            <div>
              <h1 class="font-display text-3xl text-retro-gray-800 tracking-wider">SYSTEMD GENERATOR</h1>
              <p class="font-body text-sm text-retro-gray-500">Generate systemd service files</p>
            </div>
          </div>
        </div>

        <!-- Main Card -->
        <div class="card-retro p-6 sm:p-8">
          <!-- Form -->
          <div class="space-y-5 mb-8">
            <!-- Service Name -->
            <div>
              <label class="label-retro">
                Service Name *
              </label>
              <input 
                type="text"
                v-model="serviceName"
                placeholder="my-web-app"
                class="input-retro w-full"
              />
              <p class="text-xs text-retro-gray-400 mt-1 font-body">Name for your systemd service (e.g., my-app, web-server)</p>
            </div>

            <!-- Description -->
            <div>
              <label class="label-retro">
                Description
              </label>
              <input 
                type="text"
                v-model="description"
                placeholder="My Web Application"
                class="input-retro w-full"
              />
              <p class="text-xs text-retro-gray-400 mt-1 font-body">Human-readable description of the service</p>
            </div>

            <!-- Execution Command -->
            <div>
              <label class="label-retro">
                Execution Command *
              </label>
              <input 
                type="text"
                v-model="execCommand"
                placeholder="/usr/bin/npm run start"
                class="input-retro w-full font-mono"
              />
              <p class="text-xs text-retro-gray-400 mt-1 font-body">Full path to command and arguments (e.g., /usr/bin/node /path/to/app.js)</p>
            </div>

            <!-- Working Directory -->
            <div>
              <label class="label-retro">
                Working Directory
              </label>
              <input 
                type="text"
                v-model="workingDirectory"
                placeholder="/home/user/my-web-app"
                class="input-retro w-full font-mono"
              />
              <p class="text-xs text-retro-gray-400 mt-1 font-body">Directory to run the command from</p>
            </div>

            <!-- User and Group -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="label-retro">
                  User
                </label>
                <input 
                  type="text"
                  v-model="user"
                  placeholder="www-data"
                  class="input-retro w-full"
                />
                <p class="text-xs text-retro-gray-400 mt-1 font-body">User to run the service as</p>
              </div>

              <div>
                <label class="label-retro">
                  Group
                </label>
                <input 
                  type="text"
                  v-model="group"
                  placeholder="www-data"
                  class="input-retro w-full"
                />
                <p class="text-xs text-retro-gray-400 mt-1 font-body">Group to run the service as</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button 
              @click="generateService"
              class="btn-retro-primary py-3 px-6"
            >
              <span class="font-display tracking-wider">⚙️ GENERATE SERVICE</span>
            </button>
            
            <button 
              @click="loadSample"
              class="btn-retro py-3 px-6"
            >
              <span class="font-display tracking-wide">📝 LOAD SAMPLE</span>
            </button>
            
            <button 
              @click="resetForm"
              class="btn-retro py-3 px-6"
            >
              <span class="font-display tracking-wide">🔄 RESET</span>
            </button>
          </div>

          <!-- Generated Output -->
          <div v-if="generated && serviceContent" class="space-y-6">
            <!-- Service File -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="label-retro">
                  {{ serviceFileName }}
                </label>
                <button 
                  @click="copyServiceFile"
                  class="btn-retro text-xs"
                  :class="{ 'bg-retro-mint': copiedService }"
                >
                  {{ copiedService ? '✓ Copied' : 'Copy' }}
                </button>
              </div>
              <div class="input-retro bg-retro-gray-50 p-4 font-mono text-sm overflow-x-auto">
                <pre class="whitespace-pre m-0">{{ serviceContent }}</pre>
              </div>
            </div>

            <!-- Commands -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="label-retro">
                  Installation & Management Commands
                </label>
                <button 
                  @click="copyCommands"
                  class="btn-retro text-xs"
                  :class="{ 'bg-retro-mint': copiedCommands }"
                >
                  {{ copiedCommands ? '✓ Copied' : 'Copy' }}
                </button>
              </div>
              <div class="input-retro bg-retro-gray-50 p-4 font-mono text-sm overflow-x-auto">
                <pre class="whitespace-pre m-0">{{ serviceCommands }}</pre>
              </div>
            </div>

            <!-- Instructions -->
            <div class="bg-retro-butter border-2 border-retro-gray-300 rounded-retro p-4">
              <h3 class="font-display text-sm text-retro-gray-700 mb-2 tracking-wider">📌 USAGE INSTRUCTIONS</h3>
              <ol class="font-body text-sm text-retro-gray-600 space-y-1 list-decimal list-inside">
                <li>Copy the service file content above</li>
                <li>Save it as <code class="bg-retro-gray-100 px-1 py-0.5 rounded">{{ serviceFileName }}</code></li>
                <li>Run the commands above to install and start the service</li>
                <li>Use <code class="bg-retro-gray-100 px-1 py-0.5 rounded">journalctl</code> to view logs and debug issues</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
