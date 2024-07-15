import axiosInstance from "../utils/axios";
import {getUserId, setToken, setUserId} from "./TokenService"

export async function login(credentials) {
    await axiosInstance.post('/login', credentials).then(res => {
        setToken(res.data.data.token);
        setUserId(res.data.data.user_id);
    }).catch(e => {
        console.log('error', e);
        throw e;
    });

}

export async function loadUser() {
    const id = await getUserId();
    if (!id) return null;
    let user;
    await axiosInstance.get(`/users/${id}/profile`).then(res => {
        user = res.data.data;
        console.log(res.data)
    }).catch(e => {
        console.log('error', e);
        throw e;
    });
    return user;
}