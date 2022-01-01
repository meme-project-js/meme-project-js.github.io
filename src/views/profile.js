import { getAllMemes} from '../api/data.js'
import {html} from '../lib.js'
import { getUserData } from '../util.js'

const profileTemplate = (userMemes, userData) => html `
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${userMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${userMemes.length == 0 ? html` <p class="no-memes">No memes in database.</p> 
                                        <div id="data-buttons">
                                            <a class="button" href="/create">Create new meme</a>
                                        </div>`
        : userMemes.map(memeCard)}
    </div>
</section>`

const memeCard =(meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme.objectId}">Details</a>
</div>
`

export async function profilePage(ctx) {
    const userData = getUserData()
    const data = await getAllMemes()
    const allMemes = data.results
    const userMemes = allMemes.filter(m => m.userId.objectId === userData.id)
    ctx.render(profileTemplate(userMemes, userData))

}