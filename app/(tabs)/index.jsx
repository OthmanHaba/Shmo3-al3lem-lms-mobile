import React, {useState, useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderItems';
import CourseVerticalCard from '../../components/CourseVerticalCard';
import SectionHeader from '../../components/SectionHeader'
import CategoryItem from '../../components/CategoryItem';
import FeaturedCourseCard from '../../components/FeaturedCourseCard';
import TeacherItem from '../../components/TeacherItem';
import {Redirect, useRouter} from "expo-router";
import {useAuthStore} from "../../stores/authStore";
import {getAdvertisingPanles, getCategories, getFeaturedCourses, getInstructors} from "../../services/HomeService";
import useDataStore from "../../stores/homeStore";
import {loadUser} from "../../services/AuthService";

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const {user, setUser, checkAuth, token, isLoading} = useAuthStore();
    const {
        advertisements, setAdvertisements,
        featherCategories: categories,
        setFeatherCategories: setCategories,
        featuredCourses, setFeaturedCourses,
        instructors, setInstructors,
    } = useDataStore();


    const fetchData = useCallback(async () => {
        try {
            const [advertisingData, categoriesData, featuredCoursesData, instuctorsData] = await Promise.all([
                getAdvertisingPanles(),
                getCategories(),
                getFeaturedCourses(),
                getInstructors(),
            ]);

            setAdvertisements(advertisingData.advertising_banners);
            setCategories(categoriesData.categories);
            setFeaturedCourses(featuredCoursesData);
            setInstructors(instuctorsData.users)
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }, [setAdvertisements, setCategories, setFeaturedCourses]);

    const fetchUserInfo = useCallback(async () => {
        try {
            await checkAuth();
            console.log('asdf')
            const response = await loadUser();
            setUser(response.user);
            await fetchData();
        } catch (error) {
            console.error('Failed to fetch user info', error);
        } finally {
            setLoading(false);
        }
    }, [checkAuth, setUser, fetchData]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData().finally(() => setRefreshing(false));
    }, [fetchData]);

    if (!token) {
        return <Redirect href="/login"/>;
    }

    if (loading || isLoading) {
        return <ActivityIndicator size={24} style={{flex: 1}}/>;
    }
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <HeaderComponent
                            user={user}
                            onCartPress={() => console.log('Cart pressed')}
                            onWalletPress={() => console.log('Wallet pressed')}
                            onProfilePress={() => console.log('Profile pressed')}
                            promotions={advertisements}
                        />
                        <SectionHeader title="الفئات" onPress={() => console.log('View all categories')}/>
                        <FlatList
                            data={categories}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => <CategoryItem name={item.title} iconUri={item.icon}
                                                                  onPress={() => console.log(`Category ${item} pressed`)}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        />
                        <SectionHeader title="الدورات التدريبية المتميزة"
                                       onPress={() => console.log('View all featured courses')}/>
                        <FlatList
                            data={featuredCourses}
                            renderItem={({item}) =>
                                <FeaturedCourseCard
                                    course={item}
                                    onPress={() => {
                                        router.push(`/course/${item.id}`)
                                    }}/>
                            }
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        />
                        <SectionHeader title="الاساتذة المتميزين"
                                       onPress={() => console.log('View all featured teachers')}/>
                        <FlatList
                            data={instructors}
                            renderItem={({item}) => <TeacherItem teacher={item}
                                                                 onPress={() => console.log(`Teacher ${item.id} pressed`)}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        />
                        <SectionHeader title="الدورات الاعلى تقييما"
                                       onPress={() => console.log('View all top-rated courses')}/>
                    </>
                )}
                data={featuredCourses}
                renderItem={(item) =>
                    <CourseVerticalCard course={item.item} onPress={() => console.log('Course pressed')}/>}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
        </SafeAreaView>
    );
}