import axiosInstance from "../utils/axios";

export async function getWalletBalance() {
    const response = await axiosInstance.get('/panel/financial/summary');
    return response.data;
}

export async function topUpWallet(data) {
    const response = await axiosInstance.post('/panel/financial/charge', data);
    return response.data;
}