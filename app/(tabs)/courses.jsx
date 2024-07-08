import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CourseVerticalCard from '../../components/CourseVerticalCard'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProgressBar = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const [statues, setStatues] = useState('in Progress');

  switch (clampedValue) {
    case clampedValue === 0:
      setStatues('لم تبدئ بعد');
      break;
    case clampedValue > 0:
      setStatues('قيد المشاهدة');
      break;
    case clampedValue >= 100:
      setStatues('تمت المشاهدة بالكامل')
  }
  return (
    <StyledView className="w-full">
      <View className="flex flex-row justify-between mb-2">
        <StyledText className="text-right mt-2 text-primary">
          {statues}
        </StyledText>
        <StyledText className="text-right mt-2 text-gray-700">
          {clampedValue}%
        </StyledText>
      </View>
      <StyledView className="h-2 bg-gray-200 rounded-xl overflow-hidden">
        <StyledView
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${clampedValue}%` }}
        />
      </StyledView>

    </StyledView>
  );
};

const MyCourseCard = ({ course, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row p-4 rounded-lg bg-white shadow-md mb-4 items-center">
      <View className="flex flex-row">
        <Image
          source={{ uri: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk' }}
          className="w-24 h-24 rounded-xl mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-primary mb-1 text-right">{course.title}</Text>
          <Text className="text-sm font-primary text-gray-600 mb-1 text-right">{course.author}</Text>
          <View className="flex-row items-center mb-1 justify-end">
            <FontAwesome name="star" size={16} color="gold" />
            <Text className="text-sm font-primary ml-1 mr-2 text-gray-800">{course.rating}</Text>
            <Text className="text-sm font-primary text-gray-600">{course.duration}</Text>
          </View>
          <ProgressBar value={10} />
        </View>
      </View>

    </TouchableOpacity>
  )
}


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
        <Text className="text-xl font-primary font-bold">الدورات التدريبية</Text>
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
