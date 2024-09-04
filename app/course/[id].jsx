import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, Alert} from 'react-native';
import {styled} from 'nativewind';
import {useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons, AntDesign, MaterialIcons} from '@expo/vector-icons';
import useCourseStore from "../../stores/courseStore";
import {getCourse} from "../../services/CourseService";
import {addNewItem} from "../../services/CartService";

const StyledView = styled(View);
const StyledText = styled(Text, 'font-primary');
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CourseDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('about');
    const {course, setCourse} = useCourseStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isOverLayLoading, setIsOverLayLoading] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const data = await getCourse(id);
                setCourse(data);
            } catch (error) {
                console.error("Failed to fetch coursesStore.js:", error);
                // Handle error (e.g., show error message to user)
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [id, setCourse]);

    const handleAddToCart = async () => {
        try {
            setIsOverLayLoading(true);
            const data =  await addNewItem({
                webinar_id: course.id,
            })
            console.log(data.data);
            Alert.alert('تمت الاضافة الى السلة بنجاح');
        } catch (e) {
            console.log(e);
            Alert.alert('حدث خطأ ما');
        }
        setIsOverLayLoading(false);
    }
    const renderFeatureItem = useCallback(({icon, text}) => (
        <StyledView className="flex-row items-center mb-3">
            <MaterialIcons name={icon} size={20} color="#4A5568"/>
            <StyledText className="ml-3 text-gray-700 text-base">{text}</StyledText>
        </StyledView>
    ), []);

    const renderLessonItem = useCallback(({item}) => (
        <StyledView className="bg-white p-4 mb-2 rounded-lg shadow-sm">
            <StyledText className="font-semibold text-lg">{item.title}</StyledText>
            <StyledView className="flex-row items-center mt-2">
                <AntDesign name="clockcircle" size={16} color="#718096"/>
                <StyledText className="ml-2 text-sm text-gray-600">{item.duration} min</StyledText>
            </StyledView>
        </StyledView>
    ), []);

    const renderHeader = useCallback(() => (
        <>
            <StyledView className="relative mb-4">
                <StyledImage
                    source={{uri: course.image}}
                    className="w-full h-64 rounded-lg"
                />
                <StyledTouchableOpacity
                    onPress={() => router.back()}
                    className="absolute top-4 left-4 bg-white rounded-full p-2"
                >
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </StyledTouchableOpacity>
            </StyledView>

            <StyledView className="mb-6">
                <StyledText className="text-3xl font-bold">{course.title}</StyledText>
                <StyledView className="flex-row justify-between mt-3">
                    <StyledView className="flex-row items-center">
                        <AntDesign name="star" size={20} color="#F6E05E"/>
                        <StyledText className="ml-2 font-semibold text-lg">{course.rate}</StyledText>
                    </StyledView>
                    <StyledView className="flex-row items-center">
                        <AntDesign name="clockcircle" size={20} color="#4A5568"/>
                        <StyledText className="ml-2 font-semibold text-lg">{course.duration}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>

            <StyledView className="flex-row mb-6 bg-gray-200 rounded-full p-1">
                {['about', 'lessons'].map((tab) => (
                    <StyledTouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`flex-1 py-3 rounded-full ${activeTab === tab ? 'bg-white shadow' : ''}`}
                    >
                        <StyledText className={`text-center text-lg ${activeTab === tab ? 'font-semibold' : ''}`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </StyledText>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>
        </>
    ), [course, activeTab, router]);

    const renderAboutContent = useCallback(() => (
        <>
            <StyledView className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <StyledText className="text-xl font-semibold mb-4">محتويات الكورس</StyledText>
                {renderFeatureItem({icon: 'videocam', text: '2.5 hours on-demand video'})}
                {renderFeatureItem({icon: 'insert-drive-file', text: '10 downloadable resources'})}
                {renderFeatureItem({icon: 'phone-android', text: 'Access on mobile and TV'})}
                {renderFeatureItem({icon: 'emoji-events', text: 'Certificate of completion'})}
            </StyledView>
            <StyledView className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <StyledText className="text-xl font-semibold mb-4">المدرس</StyledText>
                <StyledView className="flex-row items-center">
                    <StyledImage
                        source={{uri: course.teacher.avatar}}
                        className="w-20 h-20 rounded-full"
                    />
                    <StyledView className="ml-4">
                        <StyledText className="font-semibold text-xl">{course.teacher.full_name}</StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
        </>
    ), [renderFeatureItem]);

    const renderContent = useCallback(() => {
        if (activeTab === 'about') {
            return renderAboutContent();
        } else {
            return (
                <FlatList
                    data={course.session_chapters}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderLessonItem}
                    ListEmptyComponent={<StyledText className="text-center text-gray-500 text-lg">No lessons
                        available</StyledText>}
                />
            );
        }
    }, [activeTab, course, renderAboutContent, renderLessonItem]);

    if (isLoading) {
        return (
            <StyledView className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#4299E1"/>
                <StyledText className="mt-4 text-lg text-gray-600">Loading course details...</StyledText>
            </StyledView>
        );
    }

    if (!course) {
        return (
            <StyledView className="flex-1 justify-center items-center bg-gray-100">
                <StyledText className="text-xl text-gray-700">Course not found</StyledText>
            </StyledView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100 mx-4">
            {isOverLayLoading && (
                <StyledView className="bg-opacity-50 flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4299E1"/>
                </StyledView>
            )}
            <FlatList
                ListHeaderComponent={renderHeader}
                data={activeTab === 'lessons' ? course.session_chapters : []}
                renderItem={activeTab === 'lessons' ? renderLessonItem : null}
                ListFooterComponent={
                    <>
                        {activeTab === 'about' && renderAboutContent()}
                        <StyledTouchableOpacity onPress={handleAddToCart}
                                                className="bg-blue-500 rounded-full py-4 mt-6 mb-8 shadow-md">
                            <StyledText className="text-white text-center  text-xl">اضافة الى السلة</StyledText>
                        </StyledTouchableOpacity>
                    </>
                }
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default CourseDetailsScreen;