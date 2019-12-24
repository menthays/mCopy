const { ipcRenderer } = require('electron')

const MAX_SIZE = 5
const stack =[]
const main = document.getElementById('root')

const createItem = (text) => {
  const newElement = document.createElement('div')
  newElement.className = 'list-item'
  newElement.innerText = text
  return newElement
}

const pushToStack = (item) => {
  if (stack.size >= MAX_SIZE) {
    main.removeChild(stack[0])
    stack.pop()
  }
  stack.push(item)
  main.appendChild(stack[stack.length-1])
}

ipcRenderer.on('text-copied', (e, text) => {
  const item = createItem(text)
  pushToStack(item)
})

