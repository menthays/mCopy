const { ipcRenderer } = require('electron')

const MAX_SIZE = 5
const stack =[]
const main = document.getElementById('root')
ipcRenderer.on('text-copied', (e, text) => {
  console.log(text)
  if (stack.size >= MAX_SIZE) {
    main.removeChild(stack[0])
    stack.pop()
  }
  const newElement = document.createTextNode(text)
  stack.push(newElement)
  main.appendChild(stack[stack.length-1])
})