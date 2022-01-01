import { getUserData } from '../util.js'
import * as api from './api.js'

export const login = api.login
export const register = api.register
export const logout = api.logout


export async function getAllMemes() {
    return api.get('/classes/memes')
}

export async function getMemeById(id) {
    return api.get('/classes/memes/' + id)
}


export async function createMeme(data) {
    return api.post('/classes/memes', addOwner(data))
}

export async function editById(id, data) {
    return api.put('/classes/memes/' + id, addOwner(data))
}

export async function deleteById(id) {
    return api.del('/classes/memes/' + id)
}

function addOwner(data) {
    const userData = getUserData()
    data["userId"] = {__type: 'Pointer', className: '_User', objectId: userData.id }
    return data
}
