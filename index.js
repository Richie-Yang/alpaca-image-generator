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
  Hair: ['Default', 'Bang', 'Curls', 'Elegant', 'Fancy', 'Quiff', 'Short'],
  Ears: ['Default', 'Tilt-backward', 'Tilt-forward'],
  Eyes: ['Default', 'Angry', 'Naughty', 'Panda', 'Smart', 'Star'],
  Mouth: ['Default', 'Astonished', 'Eating', 'Laugh', 'Tongue'],
  Neck: ['Default', 'Bend-backward', 'Bend-forward', 'Thick'],
  Leg: ['Default', 'Bubble-tea', 'Tilt-backward', 'Cookie', 'Game-console', 'Tilt-forward'],
  Accessories: ['Earings', 'Flower', 'Glasses', 'Headphone'],
  Backgrounds: {
    Blue: [50, 60, 70],
    Darkblue: [30, 50, 70],
    Green: [50, 60, 70],
    Grey: [40, 60, 80],
    Red: [50, 60, 70],
    Yellow: [50, 60, 70]
  }
}


//////////////////Function Group Starts Here//////////////////
function renderCategories() {
  let rawHTML = ''
  for (let dictItem in alpacaDict) {
    rawHTML += `
      <option value="${dictItem}">${dictItem}</option>
    `
  }
  categoriesNav.innerHTML = rawHTML
}

function renderOptions(id) {
  const category = alpacaDict[id]
  let rawHTML = ''
  
  if (category['Blue']) {
    Object.keys(category).forEach(key => {
      category[key].map(test => rawHTML += `<option data-id="${id}" value="${key}${test}">${key}-${test}</option>`)
    })
  } else {
    rawHTML = category.map(categoryItem => {
      return `
      <option data-id="${id}" value="${categoryItem}">${categoryItem}</option>
      `
    }).join('')
  }

  optionsNav.innerHTML = rawHTML
}

function modifyAlpacaStyle(category, option) {
  console.log(category)
  const styleTarget = document.querySelector(`#alpaca-${category}`)
  styleTarget.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
}
//////////////////Function Group Ends Here//////////////////


///////////////Event Listener Group Starts Here///////////////
categoriesNav.addEventListener('click', function onOptionsNavClicked(event) {
  if (event.target.tagName === 'OPTION') {
    renderOptions(event.target.value)
  }
})

optionsNav.addEventListener('click', function onOptionsNavClicked(event) {
  if (event.target.tagName === 'OPTION') {
    const category = event.target.dataset.id.toLowerCase()
    const option = event.target.value.toLowerCase()
    modifyAlpacaStyle(category, option)
  }
})
///////////////Event Listener Group Ends Here///////////////


renderCategories()
renderOptions('Hair')

