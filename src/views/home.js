import {html} from '../lib.js'
import { getUserData } from '../util.js'


const homeTemplate = (userData) => html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        ${userData ? null : html `<h2>Login to see our memes right away!</h2>
                                    <div id="button-div">
                                        <a href="/login" class="button">Login</a>
                                        <a href="/register" class="button">Register</a>
                                    </div>`}
        
    </div>
</section>
`

export function homePage(ctx) {
    const userData = getUserData()
    ctx.render(homeTemplate(userData))
}