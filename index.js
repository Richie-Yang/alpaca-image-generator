const background = document.querySelector('#alpaca-background')
const ears = document.querySelector('#alpaca-ear')
const hair = document.querySelector('#alpaca-hair')
const eyes = document.querySelector('#alpaca-eyes')
const nose = document.querySelector('#alpaca-nose')
const mouth = document.querySelector('#alpaca-mouth')
const leg = document.querySelector('#alpaca-leg')
const accessories = document.querySelector('#alpaca-accessories')
const categoriesNav = document.querySelector('#alpaca-categories-nav')
const optionsNav = document.querySelector('#alpaca-options-nav')

const alpacaDict = {
  hair: ['default', 'bang', 'curls', 'elegant', 'fancy', 'quiff', 'short'],
  ears: ['default', 'tilt-backward', 'tilt-forward'],
  eyes: ['default', 'angry', 'naughty', 'panda', 'smart', 'star'],
  mouth: ['default', 'astonished', 'eating', 'laugh', 'tongue'],
  neck: ['default', 'bend-backward', 'bend-forward', 'thick'],
  leg: ['default', 'bubble-tea', 'tilt-backward', 'cookie', 'game-console', 'tilt-forward'],
  accessories: ['earings', 'flower', 'glasses', 'headphone'],
  background: {
    blue: [50, 60, 70],
    darkblue: [30, 50, 70],
    green: [50, 60, 70],
    grey: [40, 60, 80],
    red: [50, 60, 70],
    yellow: [50, 60, 70]
  }
}


function renderCategories() {
  let rawHTML = ''
  for (let dictItem in alpacaDict) {
    rawHTML += `<a href="" data-id="${dictItem}">${dictItem}</a>`
  }
  categoriesNav.innerHTML = rawHTML
}

function renderOptions(id) {
  const category = alpacaDict[id]
  let rawHTML = ''
  
  if (category['blue']) {
    Object.keys(category).forEach(key => {
      category[key].map(test => rawHTML += `<a href="">${key} ${test}</a>`)
    })
  } else {
    rawHTML = category.map(categoryItem => `<a href="" data-category="${id}" data-option="${categoryItem}">${categoryItem}</a>`).join('')
  }

  optionsNav.innerHTML = rawHTML
}

function modifyAlpacaStyle(category, option) {
  const styleTarget = document.querySelector(`#alpaca-${category}`)
  styleTarget.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
}

categoriesNav.addEventListener('click', function onOptionsNavClicked(event) {
  event.preventDefault()
  renderOptions(event.target.dataset.id)
})

optionsNav.addEventListener('click', function onOptionsNavClicked(event) {
  event.preventDefault()
  modifyAlpacaStyle(event.target.dataset.category, event.target.dataset.option)
})

renderCategories()
renderOptions('hair')

