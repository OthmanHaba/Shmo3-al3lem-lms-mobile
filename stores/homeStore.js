import {create} from 'zustand';

const useDataStore = create((set) => ({
    advertisements: [],
    setAdvertisements: (advertisements) => set({advertisements}),
    featherCategories: [],
    setFeatherCategories: (categories) => set({featherCategories: categories}),
    featuredCourses: [],
    setFeaturedCourses: (courses) => set({featuredCourses: courses}),
    instructors: [],
    setInstructors: (instructors) => set({instructors})
}));

export default useDataStore;