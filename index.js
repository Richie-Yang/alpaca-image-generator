//Declare some variables for global scope
const imageWrapper = document.querySelectorAll('.image-wrapper')[0]
const categoriesList = document.querySelector('#alpaca-categories-ul')
const categoriesSelect = document.querySelector('#alpaca-categories-select')
const categoriesLabel = document.querySelector('#alpaca-categories-label')
const optionsList = document.querySelector('#alpaca-options-ul')
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
  let rawListHTML = ''
  let rawSelectHTML = ''

  for (let dictItem in alpacaDict) {
    rawListHTML += `
      <li><a class="dropdown-item" href="#" data-id="${dictItem}">${dictItem}</a></li>
    `
    rawSelectHTML += `
      <option data-id="${dictItem}">${dictItem}</option>
    `
  }

  categoriesList.innerHTML = rawListHTML
  categoriesSelect.innerHTML = rawSelectHTML
}

function renderOptions(id) {
  const category = alpacaDict[id]
  let rawListHTML = ''
  let rawSelectHTML = ''
  
  if (category['Blue']) {
    Object.keys(category).forEach(key => {
      category[key].forEach(value => {
        rawListHTML += `
          <li><a class="dropdown-item" href="#" data-category="${id}" data-option="${key}${value}">${key}-${value}</a></li>
        `
        rawSelectHTML += `
          <option data-category="${id}" data-option="${key}${value}">${key}-${value}</option>
        `
      })
    })
  } else {
    rawListHTML = category.map(categoryItem => {
      return `
      <li><a class="dropdown-item" href="#" data-category="${id}" data-option="${categoryItem}">${categoryItem}</a></li>
      `
    }).join('')

    rawSelectHTML = category.map(categoryItem => {
      return `
      <option data-category="${id}" data-option="${categoryItem}">${categoryItem}</option>
      `
    }).join('')
  }

  optionsList.innerHTML = rawListHTML
  optionsSelect.innerHTML = rawSelectHTML
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
      if (background2.style.opacity === '1') {
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

function randomizeAlpaca(data) {
  if (imageWrapper.lastElementChild.tagName === 'CANVAS') return

  const promise1 = new Promise(resolve => {
    html2canvas(imageWrapper).then(canvas => {
      canvas.classList.add('alpaca-style-image', 'alpaca-style-screenshot')
      imageWrapper.appendChild(canvas)
      resolve(canvas)
    })
  }).then(canvas => {
    for (let category in data) {
      const targetName = `alpaca-${category.toLowerCase()}`

      if (category !== 'Backgrounds') {
        const targetObject = document.querySelector(`#${targetName}`)
        const randomIndex = Math.floor(Math.random() * alpacaDict[category].length)
        const option = alpacaDict[category][randomIndex].toLowerCase()
        targetObject.src = `
        ./external/alpaca-generator-assets/alpaca/${category.toLowerCase()}/${option}.png
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
        ./external/alpaca-generator-assets/alpaca/${category.toLowerCase()}/${randomColorName.toLowerCase()}${randomNumberValue}.png
      `
        background2.src = `
        ./external/alpaca-generator-assets/alpaca/${category.toLowerCase()}/${randomColorName.toLowerCase()}${randomNumberValue}.png
      `
      }
    }

    const imageSwitchingTimer = setInterval(() => {
      if (canvas.style.opacity === 0) {
        clearInterval(imageSwitchingTimer)
      } else {
        canvas.style.opacity -= .1
      }
    }, 20)

    setTimeout(() => {
      if (imageWrapper.lastElementChild.tagName === 'CANVAS') {
        imageWrapper.lastElementChild.remove()
      }
    }, 250);
  })
}
//////////////////Function Group Ends Here//////////////////


///////////////Event Listener Group Starts Here///////////////
categoriesList.addEventListener('click', function onCategoriesListClicked(event) {
  if (event.target.tagName === 'A') {
    categoriesLabel.innerHTML = event.target.dataset.id
    renderOptions(event.target.dataset.id)
    optionsLabel.innerHTML = 'Then, Select the Option'
  }
})

categoriesSelect.addEventListener('click', function onCategoriesSelectClicked(event) {
  if (event.target.tagName === 'OPTION') {
    categoriesLabel.innerHTML = event.target.dataset.id
    renderOptions(event.target.dataset.id)
    optionsLabel.innerHTML = 'Then, Select the Option'
  }
})

optionsList.addEventListener('click', function onOptionsListClicked(event) {
  if (event.target.tagName === 'A') {
    optionsLabel.innerHTML = event.target.dataset.option
    const category = event.target.dataset.category.toLowerCase()
    const option = event.target.dataset.option.toLowerCase()
    modifyAlpacaStyle(category, option)
  }
})

optionsSelect.addEventListener('click', function onOptionsSelectClicked(event) {
  if (event.target.tagName === 'OPTION') {
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
      html2canvas(imageWrapper).then(canvas => {
        const base64image = canvas.toDataURL("image/png")
        const download = document.createElement('a')
        download.href = base64image
        download.download = 'alpaca.png'
        download.click()
      })
      break
  }
})
///////////////Event Listener Group Ends Here///////////////


//Initialize the first view
renderCategories()
randomizeAlpaca(alpacaDict)
