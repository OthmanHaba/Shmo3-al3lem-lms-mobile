import {create} from "zustand";

export const useCourseStore = create((set) => ({
    course:{},
    setCourse:(course) => set({course})
}))

export default useCourseStore;