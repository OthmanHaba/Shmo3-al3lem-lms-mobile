import {create} from "zustand";


export const useMyCourseStore = create((set) => ({
    myCourses: [],
    setMyCourses: (myCourses) => set({myCourses}),
}));