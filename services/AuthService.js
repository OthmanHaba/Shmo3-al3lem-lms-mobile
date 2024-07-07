import axios from "../utils/axios"
import { setToken } from "./TokenService"

export async function login(credentials) {
    const { data } = await axios.post('/login', credentials)
    await setToken(data.token)
}

export async function loadUser() {
}