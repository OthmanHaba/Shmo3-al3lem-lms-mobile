import axiosInstance from "../utils/axios";

export async function getCartItems() {
    return await axiosInstance.get('/panel/cart/list').then(res => {
        return res.data.data;
    })
}

export async function removeCartItem(id) {
    return await axiosInstance.post(`/panel/cart/${id}`).then(res => {
        return res.data;
    })
}

export async function checkout() {
    /*return await axiosInstance.post('/panel/cart/checkout').then(res => {
        return res.data;
    })*/
}

export async function addNewItem(body) {
    return axiosInstance.post('/panel/cart/store',body).then(res => {
        return res.data;
    })
}