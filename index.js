const categoriesSelect = document.querySelector('#alpaca-categories-select')
const categoriesLabel = document.querySelector('#alpaca-categories-label')
const optionsSelect = document.querySelector('#alpaca-options-select')
const optionsLabel = document.querySelector('#alpaca-options-label')
// const changeDiv = document.querySelectorAll('.alpaca-change-div')

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
    Grey: [40, 70, 80],
    Red: [50, 60, 70],
    Yellow: [50, 60, 70]
  }
}


//////////////////Function Group Starts Here//////////////////
function renderCategories() {
  let rawHTML = ''
  for (let dictItem in alpacaDict) {
    rawHTML += `
      <li><a class="dropdown-item" href="#" data-id="${dictItem}">${dictItem}</a></li>
    `
  }
  categoriesSelect.innerHTML = rawHTML
}

function renderOptions(id) {
  const category = alpacaDict[id]
  let rawHTML = ''
  
  if (category['Blue']) {
    Object.keys(category).forEach(key => {
      category[key].map(value => {
        rawHTML += `
          <li><a class="dropdown-item" href="#" data-category="${id}" data-option="${key}${value}">${key}-${value}</a></li>
        `
      })
    })
  } else {
    rawHTML = category.map(categoryItem => {
      return `
      <li><a class="dropdown-item" href="#" data-category="${id}" data-option="${categoryItem}">${categoryItem}</a></li>
      `
    }).join('')
  }

  optionsSelect.innerHTML = rawHTML
}

function modifyAlpacaStyle(category, option) {
  const targetName = `alpaca-${category}`
  const targetObject = document.querySelector(`#${targetName}`)

  if (targetName === 'alpaca-backgrounds') {
    const background1 = document.querySelector(`#alpaca-backgrounds-1`)
    const background2 = document.querySelector(`#alpaca-backgrounds-2`)

    background2.style.transition = 'unset'
    background2.style.opacity = 1
    background2.src = background1.src

    const bgSwitchingTimer = setInterval(() => {
      if (background2.style.opacity = 1) {
        background1.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
        background2.style.transition = 'opacity 1s'
        background2.style.opacity = 0
        clearInterval(bgSwitchingTimer)
      }
    }, 50);

  } else {
    targetObject.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
  }
}
//////////////////Function Group Ends Here//////////////////


///////////////Event Listener Group Starts Here///////////////
categoriesSelect.addEventListener('click', function onCategoriesSelectClicked(event) {
  if (event.target.tagName === 'A') {
    categoriesLabel.innerHTML = event.target.dataset.id
    renderOptions(event.target.dataset.id)
  }
})

optionsSelect.addEventListener('click', function onOptionsSelectClicked(event) {
  if (event.target.tagName === 'A') {
    optionsLabel.innerHTML = event.target.dataset.option
    const category = event.target.dataset.category.toLowerCase()
    const option = event.target.dataset.option.toLowerCase()
    modifyAlpacaStyle(category, option)
  }
})
///////////////Event Listener Group Ends Here///////////////


renderCategories()
renderOptions('Hair')
