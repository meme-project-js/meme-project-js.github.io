import { del } from '../api/api.js'
import { deleteById, getMemeById } from '../api/data.js'
import {html} from '../lib.js'
import { getUserData } from '../util.js'

const detailsTemplate = (meme, ownerId, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>

    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${ownerId == meme.userId.objectId ?
                 html`<a class="button warning" href="/edit/${meme.objectId}">Edit</a>
                        <button @click=${onDelete} class="button danger">Delete</button>`
                    : null}
            
        </div>
    </div>
</section>
`

export async function detailsPage(ctx) {
    const meme =  await getMemeById(ctx.params.id)
    const userData = getUserData()

    let ownerId = undefined
    if(userData) {
        ownerId = userData.id
    } 

    ctx.render(detailsTemplate(meme, ownerId, onDelete))

    async function onDelete() {
        await deleteById(ctx.params.id)
        ctx.page.redirect('/catalog')
    }


}