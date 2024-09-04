import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { getMyCourses } from "../../services/MyCourseService";
import { useMyCourseStore } from "../../stores/myCourseStore";
import { useRouter } from "expo-router";

export default function Courses() {
    const [myCourses, setMyCourses] = useMyCourseStore((state) => [state.myCourses, state.setMyCourses]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const data = await getMyCourses();
                console.log(data.data.webinars);
                setMyCourses(data.data.webinars);
            } catch (e) {
                console.error(e);
                Alert.alert("خطأ", "حدث خطأ أثناء جلب البيانات");
            }
            setLoading(false);
        }
        fetchMyCourses();
    }, []);


    const CourseCard = ({ course }) => (
        <TouchableOpacity onPress={() => router.push(`/course/playableCourses/${course.id}`)} className="bg-white rounded-xl shadow-md m-2 overflow-hidden">
            <Image
                source={{ uri: course.image_cover }}
                className="w-full h-48 rounded-t-xl"
            />
            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-2">{course.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{course.category}</Text>
                <View className="flex-row items-center mb-2">
                    <FontAwesome name="user" size={16} color="#4B5563" />
                    <Text className="ml-2 text-gray-700">{course.teacher.full_name}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <FontAwesome name="clock-o" size={16} color="#4B5563" />
                        <Text className="ml-2 text-gray-700">{course.duration} min</Text>
                    </View>
                    <View className="flex-row items-center">
                        <FontAwesome name="star" size={16} color="#FCD34D" />
                        <Text className="ml-2 text-gray-700">{course.rate.toFixed(1)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const CourseList = ({ courses }) => (
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CourseCard course={item} />}
            contentContainerStyle={{ paddingVertical: 16 }}
        />
    );


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <FontAwesome name="spinner" size={24} color="black" />
            </View>
        )
    }
    return (
        <SafeAreaView className="mx-6 mt-3">
            <View className="flex-row justify-between items-center p-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-primary">كورساتي</Text>
                <TouchableOpacity>
                    <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <CourseList courses={myCourses} />
            {/*<FlatList*/}
            {/*    data={myCourses}*/}
            {/*    keyExtractor={(item) => item.toString()}*/}
            {/*    renderItem={({item}) => }*/}
            {/*/>*/}
        </SafeAreaView>
    )
}
