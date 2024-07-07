import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



const FeaturedCourseCard = ({ course, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View className="p-4 mt-4 rounded-xl bg-white mx-2 shadow-md">
      <Image
        className="w-full rounded-xl h-40"
        source={{ uri: course.image }}
      />
      <View className="flex flex-row justify-between -mt-16">
        <View className="flex flex-row items-center bg-white w-24 rounded-full px-1">
          <Image
            className="w-8 h-8 rounded-full mr-1"
            source={{ uri: course.userImage }}
          />
          <Text className="text-xs">{course.user}</Text>
        </View>
        <View className="bg-red-500 px-3 py-1 flex justify-center items-center rounded-full">
          <Text className="text-xs text-white font-bold">{course.price} دل</Text>
        </View>
      </View>
      <View className="mt-12">
        <Text className="text-lg font-bold mb-2">{course.title}</Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <AntDesign name="star" size={16} color="#FFA500" />
            <Text className="text-sm ml-1">{course.rating}</Text>
          </View>
          <View className="flex flex-row items-center">
            <AntDesign name="clockcircleo" size={16} color="#808080" />
            <Text className="text-sm ml-1">{course.duration}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);
export default FeaturedCourseCard