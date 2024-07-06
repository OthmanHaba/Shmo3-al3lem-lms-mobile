import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../components/HeaderItems";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import CourseVerticalCard from "../../components/CourseVerticalCard";

export default function TabOneScreen() {
    const user = 'othman';
    const width = Dimensions.get('window').width;
    return (
        <SafeAreaView className="flex-1 bg-whtie">
            <ScrollView>
                <HeaderComponent />
                <View className="flex flex-row mx-2 justify-between items-center">
                    <TouchableOpacity>
                        <Text className="text-xl text-yellow-500">عرض الكل</Text>
                    </TouchableOpacity>
                    <Text className="text-xl ">الفئات</Text>

                </View>
                <View>
                    <FlatList
                        data={[...new Array(3).keys()]}
                        renderItem={() => (
                            <TouchableOpacity>
                                <View className="border flex flex-row gap-1 px-2 py-1 bg-white rounded-2xl m-2 shadow-xl w-fit ">
                                    <AntDesign name="shoppingcart" size={24} color="black" />
                                    <Text>category</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        horizontal
                    />
                </View>
                <View>
                    <View className="flex flex-row mx-2 justify-between items-center mt-6">
                        <TouchableOpacity>
                            <Text className="text-xl text-yellow-500">عرض الكل</Text>
                        </TouchableOpacity>
                        <Text className="text-xl">الدورات التدريبية المتميزة</Text>
                    </View>
                    <FlatList
                        data={[...new Array(3).keys()]}

                        renderItem={() => (
                            <View className="p-4 mt-4 rounded-xl bg-white mx-2">
                                <Image
                                    className="w-full rounded-xl h-40 "
                                    source={require('../../assets/images/Promotion Card.png')}
                                />
                                <View className="flex flex-row justify-between -mt-16">
                                    <View className=" flex flex-row  items-center bg-white w-20 rounded-2xl">
                                        <Image
                                            className="w-8 h-8 rounded-2xl mr-1"
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png'
                                            }}
                                        />
                                        <Text className="text-xs">by user</Text>
                                    </View>

                                    <View className="bg-red-500 px-2 flex justify-center items-center rounded-2xl">
                                        <Text className="text-xs text-white">99 دل</Text>
                                    </View>
                                </View>
                                <View className="mt-3">
                                    <View>
                                        <Text className="text-xl font-bold">رياضة 1</Text>
                                    </View>
                                    <View className="flex flex-row justify-between gap-3">
                                        <View className="flex flex-row gap-1">
                                            <AntDesign name="staro" size={16} color="black" />
                                            <Text className="text-xs">4.5</Text>
                                        </View>
                                        <View className="flex flex-row gap-1">
                                            <AntDesign name="clockcircleo" size={16} color="black" />
                                            <Text className="text-xs">خمس ساعات و ثلاثين دقيقة</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        horizontal
                    />
                </View>
                <View>
                    <View className="flex flex-row mx-2 justify-between items-center mt-6">
                        <TouchableOpacity>
                            <Text className="text-xl text-yellow-500">عرض الكل</Text>
                        </TouchableOpacity>
                        <Text className="text-xl">الاساتذة المتميزين</Text>
                    </View>
                    <FlatList
                        data={[...new Array(3).keys()]}

                        renderItem={() => (
                            <View className="mt-3 mx-3 flex items-center ">
                                <View
                                    className="w-16 h-16 rounded-full border items-center justify-center"
                                >
                                    <Image
                                        className="w-14 h-14 rounded-full border p-1"
                                        source={{
                                            uri: 'https://reactnative.dev/img/tiny_logo.png'
                                        }}
                                    />
                                </View>
                                <View className="bg-[#64748B]  rounded-xl px-1 py-0.5 -mt-1">
                                    <Text className="text-white">حميدا</Text>
                                </View>
                            </View>)}
                        horizontal
                    />
                </View>
                <View className="flex flex-row mx-2 mb-3 justify-between items-center mt-6">
                    <TouchableOpacity>
                        <Text className="text-xl text-yellow-500">عرض الكل</Text>
                    </TouchableOpacity>
                    <Text className="text-xl">الدورات الاعلى تقييما</Text>
                </View>
                <View className="">

                    <FlatList
                        data={[...new Array(3).keys()]}
                        renderItem={() => (
                            <CourseVerticalCard/>
                        )}

                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
