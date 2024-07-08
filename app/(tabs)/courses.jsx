import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import MyCourseCard from '../../components/MyCourseCard';

export default function Courses() {
  const course = {
    title: "رياضة 2- (نصفي)",
    author: "بواسطة محمد احمد",
    rating: "4.6",
    duration: "4 ساعات و 30 دقيقة",
    price: "24",
    image: "https://example.com/course-image.jpg"
  };
  return (
    <SafeAreaView className="mx-6 mt-3">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-primary">كورساتي</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[...new Array(3).keys()]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <MyCourseCard course={course} onPress={() => console.log(course)} />}
      />
    </SafeAreaView>
  )
}
