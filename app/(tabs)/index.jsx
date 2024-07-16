import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../../components/HeaderItems';
import CourseVerticalCard from '../../components/CourseVerticalCard';
import SectionHeader from '../../components/SectionHeader'
import CategoryItem from '../../components/CategoryItem';
import FeaturedCourseCard from '../../components/FeaturedCourseCard';
import TeacherItem from '../../components/TeacherItem';
import {loadUser} from "../../services/AuthService";
import {useAuthStore} from "../../stores/authStore";
import {router} from "expo-router";
import {useLoading} from "../../contexts/LoadingContext";


export default function TabOneScreen() {
    const [refreshing, setRefreshing] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);
    const [loading, setLoading] = useLoading();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                await loadUser(setUser);
            } catch (error) {
                console.error('Failed to load user:', error);
                router.replace('(auth)/login'); // Replace with your login route name
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [setUser]);
    
    const course = {
        title: "رياضة 2- (نصفي)",
        author: "بواسطة محمد احمد",
        rating: "4.6",
        duration: "4 ساعات و 30 دقيقة",
        price: "24",
        image: "https://example.com/course-image.jpg"
    };

    const promotions = [
        {id: 1, image: "https://example.com/promotion1.jpg"},
        {id: 2, image: "https://example.com/promotion2.jpg"},
    ];

    const categories = ['الرياضيات', 'العلوم', 'اللغة العربية', 'التاريخ', 'الجغرافيا'];
    const featuredCourses = [
        {
            id: 1,
            title: 'الرياضيات المتقدمة',
            user: 'د. أحمد',
            userImage: 'https://example.com/user1.jpg',
            price: 99,
            rating: 4.5,
            duration: '٥ ساعات',
            image: 'https://example.com/math.jpg'
        },
        {
            id: 2,
            title: 'الفيزياء الحديثة',
            user: 'د. سارة',
            userImage: 'https://example.com/user2.jpg',
            price: 89,
            rating: 4.2,
            duration: '٤ ساعات',
            image: 'https://example.com/physics.jpg'
        },
        {
            id: 3,
            title: 'الأدب العربي',
            user: 'أ. محمد',
            userImage: 'https://example.com/user3.jpg',
            price: 79,
            rating: 4.7,
            duration: '٦ ساعات',
            image: 'https://example.com/literature.jpg'
        },
    ];
    const teachers = [
        {id: 1, name: 'د. حميدا', image: 'https://example.com/teacher1.jpg'},
        {id: 2, name: 'أ. محمد', image: 'https://example.com/teacher2.jpg'},
        {id: 3, name: 'د. فاطمة', image: 'https://example.com/teacher3.jpg'},
    ];

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Fetch data on here
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <HeaderComponent
                            user="othman"
                            onCartPress={() => console.log('Cart pressed')}
                            onWalletPress={() => console.log('Wallet pressed')}
                            onProfilePress={() => console.log('Profile pressed')}
                            promotions={promotions}
                        />
                        <SectionHeader title="الفئات" onPress={() => console.log('View all categories')}/>
                        <FlatList
                            data={categories}
                            renderItem={({item}) => <CategoryItem name={item}
                                                                  onPress={() => console.log(`Category ${item} pressed`)}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        />
                        <SectionHeader title="الدورات التدريبية المتميزة"
                                       onPress={() => console.log('View all featured courses')}/>
                        <FlatList
                            data={featuredCourses}
                            renderItem={({item}) => <FeaturedCourseCard course={item}
                                                                        onPress={() => console.log(`Course ${item.id} pressed`)}/>}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        />
                        <SectionHeader title="الاساتذة المتميزين"
                                       onPress={() => console.log('View all featured teachers')}/>
                        <FlatList
                            data={teachers}
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
                data={[...new Array(3).keys()]}
                renderItem={() =>
                    <CourseVerticalCard course={course} onPress={() => console.log('Course pressed')}/>}
                keyExtractor={(item) => item.toString()}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
        </SafeAreaView>
    );
}