import axiosInstance from "../utils/axios";

export async function getAdvertisingPanles() {
    return axiosInstance.get('/filament/advertisements').then(res => {
        return res.data;
    })
}

export async function getCategories() {
    return axiosInstance.get('/trend-categories').then(res => {
        return res.data.data;
    })
}

export async function getFeaturedCourses() {
    return axiosInstance.get('/featured-courses').then(res => {
        return res.data.data;
    })
}

export async function getInstructors() {
    return axiosInstance.get('/instructors').then(res => {
        return res.data.data
    })
}