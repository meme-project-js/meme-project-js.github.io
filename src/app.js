import {render, page} from './lib.js'
import { getUserData } from './util.js'
import { catalogPage } from './views/catalog.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { homePage } from "./views/home.js"
import { loginPage } from './views/login.js'
import { profilePage } from './views/profile.js'
import { registerPage } from './views/register.js'
import { logout, createMeme } from './api/data.js'

window.createMeme = createMeme

const root = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', logingOut)


page(decorateContext)
page('/', homePage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/login', loginPage)
page('/register', registerPage)
page('/create', createPage)
page('/profile', profilePage)
page('/catalog', catalogPage)

updateUserNav()
page.redirect('/')
page.start()



function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root)
    ctx.updateUserNav = updateUserNav
    next()
}

function updateUserNav() {
    const userData = getUserData()
    if (userData !== null) {
        document.querySelector('.user').style.display = 'block'
        document.querySelector('.user span').textContent = `Welcome, ${userData.username}`
        document.querySelector('.guest').style.display = 'none'
    } else {
        document.querySelector('.user').style.display = 'none'
        document.querySelector('.guest').style.display = 'block'
    }
}


async function logingOut() {
    await logout()
    updateUserNav()
    page.redirect('/')
}