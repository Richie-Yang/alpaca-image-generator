const categoriesSelect = document.querySelector('#alpaca-categories-select')
const categoriesLabel = document.querySelector('#alpaca-categories-label')
const optionsSelect = document.querySelector('#alpaca-options-select')
const optionsLabel = document.querySelector('#alpaca-options-label')
const footerSection = document.querySelector('#footer-section')


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
    background2.style.opacity = '1'
    background2.src = background1.src

    const bgSwitchingTimer = setInterval(() => {
      if (background2.style.opacity === '1') {
        background1.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
        background2.style.transition = 'opacity 1s'
        background2.style.opacity = '0'
        clearInterval(bgSwitchingTimer)
      }
    }, 50);

  } else {
    targetObject.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
  }
}

function randomizeAlpaca(data) {
  for (let category in data) {
    const targetName = `alpaca-${category.toLowerCase()}`
    
    if (category !== 'Backgrounds') {
      const targetObject = document.querySelector(`#${targetName}`)
      const randomIndex = Math.floor(Math.random() * alpacaDict[category].length)
      const option = alpacaDict[category][randomIndex]
      targetObject.src = `
        ./external/alpaca-generator-assets/alpaca/${category}/${option}.png
      `
    } else {
      const bgColorNameArray = Object.keys(alpacaDict[category])
      const randomColorIndex = Math.floor(Math.random() * bgColorNameArray.length)
      const randomColorName = bgColorNameArray[randomColorIndex]
      
      const bgColorNumberArray = alpacaDict[category][randomColorName]
      const randomNumberIndex = Math.floor(Math.random() * bgColorNumberArray.length)
      const randomNumberValue = bgColorNumberArray[randomNumberIndex]

      const background1 = document.querySelector(`#${targetName}-1`)
      const background2 = document.querySelector(`#${targetName}-2`)
      
      background1.src = `
        ./external/alpaca-generator-assets/alpaca/${category}/${randomColorName}${randomNumberValue}.png
      `
      background2.src = `
        ./external/alpaca-generator-assets/alpaca/${category}/${randomColorName}${randomNumberValue}.png
      `
    }
  }
}
//////////////////Function Group Ends Here//////////////////


///////////////Event Listener Group Starts Here///////////////
categoriesSelect.addEventListener('click', function onCategoriesSelectClicked(event) {
  if (event.target.tagName === 'A') {
    categoriesLabel.innerHTML = event.target.dataset.id
    renderOptions(event.target.dataset.id)
    optionsLabel.innerHTML = 'Then, Select the Option'
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

footerSection.addEventListener('click', function onFooterSectionClicked(event) {
  event.preventDefault()
  switch (event.target.dataset.id) {
    case 'random':
      randomizeAlpaca(alpacaDict)
      categoriesLabel.innerHTML = 'First, Select the Category'
      optionsLabel.innerHTML = 'Then, Select the Option'
      break
    case 'download':
      break
  }
})
///////////////Event Listener Group Ends Here///////////////


renderCategories()
setTimeout(() => {
  randomizeAlpaca(alpacaDict)
}, 250);

