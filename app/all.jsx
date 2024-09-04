import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CourseVerticalCard from "../components/CourseVerticalCard";
import getAllCourses from "../services/CoursesService";
import {useCoursesStore} from "../stores/coursesStore";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {useRouter} from "expo-router";

export default function All() {

    const [loading, setLoading] = useState(false)
    const {courses, setCourses} = useCoursesStore();
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);

            const data = await getAllCourses();

            setCourses(data.data);
            setLoading(false);
        }

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator size={24} style={{flex: 1}}/>
        )
    }


    const CourseCard = ({course}) => {
        return (
            <TouchableOpacity
                onPress={() => router.push(`/course/${course.id}`)}
                className="bg-white rounded-xl shadow-md m-2 overflow-hidden">
                <Image
                    source={{uri: course.image}}
                    className="w-full h-40 rounded-t-xl"
                    resizeMode="cover"
                />
                <View className="p-4">
                    <Text className="text-lg font-bold text-gray-800 mb-1">{course.title}</Text>
                    <Text className="text-sm text-gray-600 mb-2">{course.category}</Text>

                    <View className="flex-row items-center mb-2">
                        <Image
                            source={{uri: course.teacher.avatar}}
                            className="w-6 h-6 rounded-full mr-2"
                        />
                        <Text className="text-sm text-gray-700">{course.teacher.full_name}</Text>
                    </View>

                    <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center">
                            <FontAwesome name="clock-o" size={14} color="#6B7280"/>
                            <Text className="text-sm text-gray-600 ml-1">{course.duration} mins</Text>
                        </View>
                        <View className="flex-row items-center">
                            <FontAwesome name="users" size={14} color="#6B7280"/>
                            <Text className="text-sm text-gray-600 ml-1">{course.students_count} students</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <FontAwesome name="star" size={14} color="#FBC02D"/>
                            <Text className="text-sm text-gray-700 ml-1">
                                ({course.reviews_count} reviews)
                                {/*12 reviews*/}
                            </Text>
                        </View>
                        <Text className="text-lg font-bold text-indigo-600">{course.price_string}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView className='mt-2 mx-4'>
            <View className="flex-row justify-between items-center p-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black"/>
                </TouchableOpacity>
                <Text className="text-xl font-primary">الدورات التدريبية</Text>
                <TouchableOpacity onPress={() => router.push('/search')}>
                    <AntDesign name="search1" size={24} color="black"/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={courses}
                renderItem={({item}) => <CourseCard course={item}/>}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingHorizontal: 8, paddingVertical: 16}}
            />
        </SafeAreaView>
    )
}

