import axiosInstance from "../utils/axios";

export async function getWalletBalance() {
    const response = await axiosInstance.get('/panel/financial/summary');
    return response.data;
}