import { createMeme } from '../api/data.js';
import {html} from '../lib.js'
import { notify } from '../notification.js';


const createTemplate = (onClick) => html`
<section id="create-meme">
    
    <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description"></textarea>
        <label for="imageUrl">Meme Image</label>
        <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
        <button @click = ${onClick} class="registerbtn button">Create Meme</button>
    </div>

</section>
`

export function createPage(ctx) {
    ctx.render(createTemplate(onClick));

    async function onClick(ev) {
        ev.preventDefault()

        const title = document.getElementById('title').value.trim();
        const description =  document.getElementById('description').value.trim();
        const imageUrl =  document.getElementById('imageUrl').value.trim();

        if (title === '' || description === '' || imageUrl === '') {
            return notify('All fields are required')
        }
        await createMeme({
            title,
            description,
            imageUrl
        })

        ctx.page.redirect('/catalog')
    }
}