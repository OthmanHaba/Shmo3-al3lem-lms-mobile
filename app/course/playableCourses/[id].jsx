import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import axiosInstance from '../../../utils/axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CourseDetailsScreen({ route }) {
    const params = useLocalSearchParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    useEffect(() => {
        fetchCourseData();
    }, []);

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`panel/webinars/${params.id}`);
            setCourse(response.data.data[0]); // Assuming the API returns an array with one course
            setLoading(false);
        } catch (err) {
            console.error('Error fetching course data:', err);
            setError('Failed to load course data. Please try again.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <ActivityIndicator size="large" color="#4B5563" />
                <Text className="mt-4 text-gray-600">Loading course data...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
                <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                <Text className="mt-4 text-gray-800 text-center px-4">{error}</Text>
                <TouchableOpacity
                    className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
                    onPress={fetchCourseData}
                >
                    <Text className="text-white font-semibold">Try Again</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <ScrollView>
                {/* Header */}
                <View className="relative">
                    <Image
                        source={{ uri: course.image }}
                        className="w-full h-48 object-cover"
                    />
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-4 left-4 bg-white rounded-full p-2"
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Course Title */}
                <View className="p-4 bg-white shadow-sm">
                    <Text className="text-2xl font-bold text-gray-800">
                        {course.translations[0].title}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        {course.category.translations.find(t => t.locale === 'en').title}
                    </Text>
                </View>

                {/* Course Details */}
                <View className="bg-white mt-2 p-4">
                    <Text className="text-lg font-primary mb-2">تفاصيل الكورس</Text>
                    <View className="flex-row justify-between mb-2">
                        <Text className="font-primary">{course.duration} minutes</Text>
                        <Text className="text-gray-600">المدة</Text>
                    </View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="font-primary">{course.access_days} days</Text>
                        <Text className="text-gray-600">مدة الصلاحية</Text>
                    </View>
                </View>

                {/* Course Description */}
                <View className="bg-white mt-2 p-4">
                    <Text className="text-lg font-primary mb-2">التفاصيل</Text>
                    <Text className="text-gray-700">
                        {course.translations[0].description.replace(/<[^>]*>/g, '')}
                    </Text>
                </View>

                {/* Course Content */}
                <View className="bg-white mt-2 p-4">
                    <Text className="text-lg font-primary mb-2">محتويات الكورس</Text>
                    {course.chapters.map((chapter, index) => (
                        <View key={chapter.id} className="mb-4">
                            <Text className="font-medium text-gray-800 mb-2">
                                Chapter {index + 1}: {chapter.translations[0].title}
                            </Text>
                            {chapter.chapter_items.map(item => (
                                <View key={item.id} className="flex-row items-center ml-4 mb-2">
                                    <Ionicons name="document-text-outline" size={18} color="#4B5563" />
                                    <Text className="text-gray-600 ml-2">
                                        {course.files.find(f => f.id === item.item_id)?.translations[0].title}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                {/* Start Course Button */}
                <TouchableOpacity onPress={() => router.push(`/course/playableCourses/vedio/${course.files[0].id}`)} className="bg-blue-500 mx-4 my-6 py-3 rounded-lg">
                    <Text className="text-white text-center font-semibold">Start Course</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
