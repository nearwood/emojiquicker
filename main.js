import emojis from 'emojibase-data/en/compact.json'
import './style.css'

const searchInput = document.getElementById('search')
const grid = document.getElementById('emoji-grid')
const resultCount = document.getElementById('result-count')
const toast = document.getElementById('toast')

// Pre-filter to emojis that have an order (real emojis, not components/regional indicators)
const allEmojis = emojis
  .filter(e => e.order != null)
  .sort((a, b) => a.order - b.order)

let debounceTimer = null

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => render(searchInput.value.trim().toLowerCase()), 150)
})

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('.emoji-btn')
  if (!btn) return
  navigator.clipboard.writeText(btn.textContent).then(() => showToast())
})

function render(query) {
  if (!query) {
    resultCount.textContent = ''
    grid.innerHTML = '<div class="prompt">Type to search emojis</div>'
    return
  }

  const results = allEmojis.filter(e => {
    if (e.label.includes(query)) return true
    if (e.tags && e.tags.some(t => t.includes(query))) return true
    return false
  })

  resultCount.textContent = `${results.length} result${results.length === 1 ? '' : 's'}`

  if (results.length === 0) {
    grid.innerHTML = '<div class="prompt">No emojis found</div>'
    return
  }

  grid.innerHTML = results
    .map(e => `<button class="emoji-btn" title="${e.label}">${e.unicode}</button>`)
    .join('')
}

let toastTimer = null
function showToast() {
  clearTimeout(toastTimer)
  toast.classList.add('show')
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1500)
}

// Initial state
render('')
