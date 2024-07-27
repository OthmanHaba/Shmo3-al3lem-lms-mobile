import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import {useLocalSearchParams, useRouter} from "expo-router";
import useCourseStore from "../../stores/courseStore";
import {getCourse} from "../../services/CourseService";
import {SafeAreaView} from "react-native-safe-area-context";
import { Ionicons ,AntDesign } from '@expo/vector-icons';
const StyledView = styled(View);
const StyledText = styled(Text,'font-primary');
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CourseDetailsScreen = () => {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [activeTap, setActiveTap] = useState(1)
    const {course , setCourse} = useCourseStore()
    useEffect(() => {
        const fetchCourse = async () => {
            const data =  await getCourse(id);
            setCourse(data);
        }
        fetchCourse();
    }, []);


    return (
        <SafeAreaView className="h-full">
            <ScrollView className="flex-1 bg-gray-100">
                <StyledView className="p-4">
                    {/* Header */}
                    <StyledView className="relative mb-4">
                        <StyledImage
                            source={{ uri: course.image }}
                            className="w-full h-48 rounded-lg"
                        />
                        <StyledView className="absolute top-2 left-2 bg-white rounded-full p-2">
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back-outline" size={18} color="black" />
                            </TouchableOpacity>
                        </StyledView>
                    </StyledView>

                    {/* Course info */}
                    <StyledView className="mb-4">
                        <StyledText className="text-2xl">{course.title}</StyledText>
                        <StyledView className="flex-row justify-end gap-1">
                            <StyledView className="flex-row gap-0.5 items-center mt-2">
                                <AntDesign name="staro" size={14} color="black" />
                                <StyledText className="text-sm font-bold text-gray-600">{course.rate}</StyledText>
                            </StyledView>
                            <StyledView className="flex-row gap-0.5 items-center mt-2">
                                <AntDesign name="clockcircleo" size={14} color="black" />
                                <StyledText className="text-sm font-bold text-gray-600">{course.duration}</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Tabs */}
                    <StyledView className="flex-row mb-4 p-2 bg-[#EFF0FE] rounded-full">
                        <StyledTouchableOpacity onPress={ () => setActiveTap(1)} className={`flex-1 py-2  rounded-full ${(activeTap === 1) ? 'bg-secondry' : ''}`}>
                            <StyledText className={`text-center ${activeTap === 1 ? 'text-white': ''}`}>عن الدورة</StyledText>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity onPress={() => setActiveTap(2)} className={`flex-1 py-2  rounded-full ${(activeTap === 2) ? 'bg-secondry' : ''}`}>
                            <StyledText className={`text-center ${activeTap === 2 ? 'text-white': ''}`}>الدروس</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>

                     {/*Course includes */}
                    {(activeTap === 1 )? (
                        <>
                            <StyledView className="bg-white rounded-lg p-4 mb-4">
                                <StyledText className="text-lg font-semibold mb-2">This course includes</StyledText>
                                {/* List course features */}

                                <StyledView className="flex-row items-center mb-2">
                                    <StyledText className="ml-2">2.5 hours on-demand video</StyledText>
                                </StyledView>
                                {/* Add more features */}
                            </StyledView>
                            <StyledView className="bg-white rounded-lg p-4 mb-4">
                                <StyledView className="flex-row items-center">
                                    <StyledImage
                                        source={{ uri: 'https://example.com/instructor-avatar.jpg' }}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <StyledView className="ml-3">
                                        <StyledText className="font-semibold">Instructor Name</StyledText>
                                        <StyledText className="text-sm text-gray-600">Course Instructor</StyledText>
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                        </>
                    ) : (
                        <ScrollView className="flex">
                            <TouchableOpacity onPress={() => console.log(course.session_chapters[0].sessions[0])}><Text>salkdjf</Text></TouchableOpacity>

                        </ScrollView>
                    )}
                    {/* Buy button */}
                    <StyledTouchableOpacity className="bg-primray  rounded-full py-3 mt-4">
                        <StyledText className="text-secondry text-center font-semibold">اشتري الان</StyledText>
                    </StyledTouchableOpacity>
                </StyledView>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CourseDetailsScreen;