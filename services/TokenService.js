import * as SecureStore from "expo-secure-store"

let token = null;
let userId = null;

export async function setToken(data) {
    token = data.token;
    userId = data.user_id;

    if (token !== null) {
        await SecureStore.setItemAsync("token", token);
        await SecureStore.setItemAsync("userId", userId.toString());
    } else {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("userId");
    }
}

export async function getToken() {
    if (token !== null) {
        return token
    }

    token = await SecureStore.getItemAsync("token");
    return token
}

export async function getUserId() {
    if (userId !== null) {
        return userId
    }

    userId = await SecureStore.getItemAsync("userId");
    return userId
}