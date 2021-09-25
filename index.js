const categoriesInput = document.querySelector('#alpaca-categories-input')
const categoriesSelect = document.querySelector('#alpaca-categories-select')
const optionsSelect = document.querySelector('#alpaca-options-select')
const optionsInput = document.querySelector('#alpaca-options-input')
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
  const styleTarget = document.querySelector(`#alpaca-${category}`)
  styleTarget.src = `./external/alpaca-generator-assets/alpaca/${category}/${option}.png`
}
//////////////////Function Group Ends Here//////////////////


///////////////Event Listener Group Starts Here///////////////
// categoriesSelect.addEventListener('click', function onCategoriesSelectClicked(event) {
//   if (event.target.tagName === 'OPTION') {
//     renderOptions(event.target.value)
//   }
// })

// optionsSelect.addEventListener('click', function onOptionsSelectClicked(event) {
//   if (event.target.tagName === 'OPTION') {
//     const category = event.target.dataset.id.toLowerCase()
//     const option = event.target.value.toLowerCase()
//     modifyAlpacaStyle(category, option)
//   }
// })

categoriesSelect.addEventListener('click', function onCategoriesSelectClicked(event) {
  if (event.target.tagName === 'A') {
    categoriesInput.value = event.target.dataset.id
    renderOptions(event.target.dataset.id)
  }
})

optionsSelect.addEventListener('click', function onOptionsSelectClicked(event) {
  if (event.target.tagName === 'A') {
    optionsInput.value = event.target.dataset.option
    const category = event.target.dataset.category.toLowerCase()
    const option = event.target.dataset.option.toLowerCase()
    modifyAlpacaStyle(category, option)
  }
})
///////////////Event Listener Group Ends Here///////////////


renderCategories()
renderOptions('Hair')


// setInterval(function () {
//   // console.log(window.innerWidth)
//   // console.log(changeDiv)
//   switch (true) {
//     case (window.innerWidth < 768):
//       changeDiv.forEach(divItem => {
//         divItem.lastElementChild.size = '4'
//       })
//       break
//     case (window.innerWidth < 992):
//       changeDiv.forEach(divItem => {
//         divItem.lastElementChild.size = '5'
//       })
//       break
//     case (window.innerWidth < 1200):
//       changeDiv.forEach(divItem => {
//         divItem.lastElementChild.size = '7'
//       })
//       break
//     case (window.innerWidth < 1400):
//       changeDiv.forEach(divItem => {
//         divItem.lastElementChild.size = '9'
//       })
//       break
//   }
// }, 100)