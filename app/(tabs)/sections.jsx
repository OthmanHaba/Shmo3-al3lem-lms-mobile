import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

const categories = [
  { id: 1, title: 'شهادة ثانوية', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'شهادة اعدادية', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'علوم تطبيقية', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'هندسة', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'تقنية معلومات', image: 'https://via.placeholder.com/150' },
  { id: 6, title: 'طب بشري', image: 'https://via.placeholder.com/150' },
];

export default function Sections() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">التصنيفات</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <View className="flex-row flex-wrap justify-between">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
            >
              <Image 
                source={{ uri: category.image }} 
                className="w-full h-32 mb-2" 
                resizeMode="contain" 
              />
              <Text className="text-center font-semibold">{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
