import axios from "../utils/axios"
import { setToken } from "./TokenService"

export async function login(credentials) {
    const { data } = await axios.post('/login', credentials).catch(e => {
        console.log('error', e);
    })
    // await setToken(data.token)
    console.log(data)
}

export async function loadUser() {
    // const { data: user } = await axios.get('/user');
    // return user;/
    console.log('user')
}