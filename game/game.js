const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange country and in a house you have never been in before. You see a map',
    options: [
      {
        text: 'Take the map',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the map',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'On your way out, you meet a merchant willing to trade you the map for a mask to keep you safe from COVID-19 or a dictionary to translate English into the local language .',
    options: [
      {
        text: 'Trade the map for a mask',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the map for a dictionary for the local language',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired.',
    options: [
      {
        text: 'Continue to explore the town',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the town and are robbed and killed',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the town.',
    options: [
      {
        text: 'Explore the country',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a den of thieves who want to rob you.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Take out your dictionary and try speaking in their launguage',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Calmly explain to the thieves in English that you are lost',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the thieves catch you and rob you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The thieves do not understand what you are saying and are annoyed and kill you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The thieves do not know what you have on your face. They see you as a threat and kill you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You are in Nauru! Nauru is a country in the pacific ocean. It is the smallest island country in the world. The people of Nauru speak English and the country has the lowest carbon emission in the world!Early and decisive measures successfully prevented an outbreak of COVID-19 in Nauru, and as of January 2022 there have been no COVID-19 cases on the island..',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()

