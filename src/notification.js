const element  = document.getElementById('errorBox')
const output = element.querySelector('span')

export function notify(msg) {
    element.style.display = 'block'
    output.textContent = msg
    setTimeout(() =>{element.style.display = 'none'} ,3000)
}