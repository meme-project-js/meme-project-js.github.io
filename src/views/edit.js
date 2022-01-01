import { editById, getMemeById } from '../api/data.js'
import {html} from '../lib.js'
import { notify } from '../notification.js';

const editTemplate = (meme, onClick) => html `
 <section id="edit-meme">
    
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title} />
        <label for="description">Description</label>
        <textarea id="description" placeholder="Enter Description" name="description">${meme.description}</textarea>
        <label for="imageUrl">Image Url</label>
        <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl} />
        <button @click = ${onClick} class="registerbtn button">Edit Meme</button>
    </div>
    
</section>
`

export async function editPage(ctx) {
    const meme = await getMemeById(ctx.params.id);
    ctx.render(editTemplate(meme, onClick))

    async function onClick(ev) {
        ev.preventDefault();

        const title = document.getElementById('title').value.trim();
        const description =  document.getElementById('description').value.trim();
        const imageUrl =  document.getElementById('imageUrl').value.trim();

        if (title === '' || description === '' || imageUrl === '') {
            return notify('All fields are required')
        }

        await editById(ctx.params.id, {
            title,
            description,
            imageUrl
        })

        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}