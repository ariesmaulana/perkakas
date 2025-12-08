/**
 * Shared tools data for the application
 * @typedef {Object} Tool
 * @property {string} title - Tool title
 * @property {string} description - Tool description
 * @property {string} icon - Emoji icon
 * @property {string} link - Route path
 * @property {string} color - Card accent color
 * @property {string} category - Tool category for filtering
 */

/** @type {Tool[]} */
export const tools = [
    {
        title: 'Password Generator',
        description: 'Generate secure, random passwords with customizable length and character options.',
        icon: '🔐',
        link: '/tools/password-generator',
        color: 'mint',
        category: 'security'
    },
    {
        title: 'Days Counter',
        description: 'Calculate the number of days between two dates or until a future date.',
        icon: '📅',
        link: '/tools/days-counter',
        color: 'lavender',
        category: 'utility'
    },
    {
        title: 'JSON Prettify',
        description: 'Format and beautify JSON data with syntax highlighting and validation.',
        icon: '📋',
        link: '/tools/json-prettify',
        color: 'sky',
        category: 'developer'
    },
    {
        title: 'Random Key Generator',
        description: 'Generate secure WPA and WEP encryption keys for network security.',
        icon: '🔑',
        link: '/tools/random-key',
        color: 'peach',
        category: 'security'
    },
    {
        title: 'Text Diff',
        description: 'Compare two texts and highlight the differences between them.',
        icon: '📝',
        link: '/tools/text-diff',
        color: 'cream',
        category: 'developer'
    },
    {
        title: 'Random Picker',
        description: 'Add names and spin to randomly pick a winner.',
        icon: '🎲',
        link: '/tools/random-picker',
        color: 'butter',
        category: 'utility'
    },
    {
        title: 'Lorem Ipsum',
        description: 'Generate placeholder text with configurable paragraphs, sentences, and words.',
        icon: '📄',
        link: '/tools/lorem-ipsum',
        color: 'lavender',
        category: 'developer'
    }
]

/** @type {string[]} */
export const categories = ['all', 'security', 'utility', 'developer']

/**
 * Filter tools by category and search query
 * @param {Tool[]} toolsList - List of tools to filter
 * @param {string} category - Category to filter by ('all' for no filter)
 * @param {string} searchQuery - Search query to filter by
 * @returns {Tool[]} Filtered tools
 */
export function filterTools(toolsList, category = 'all', searchQuery = '') {
    let filtered = toolsList

    if (category && category !== 'all') {
        filtered = filtered.filter(tool => tool.category === category)
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(tool =>
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        )
    }

    return filtered
}
