import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import useDataStore from "../../stores/homeStore";

export default function Sections() {

  const {featherCategories} = useDataStore();


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-primary">التصنيفات</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <View className="flex-row flex-wrap justify-between">
          {featherCategories.map((category) => (
            <TouchableOpacity
                onPress={() => console.log('category', category.id)}
              key={category.id}
              className="w-[48%] bg-gray-100 rounded-lg p-4 mb-4"
            >
              <Image 
                source={{ uri: category.icon }}
                className="w-full h-32 mb-2" 
                resizeMode="contain" 
              />
              <Text className="text-center font-primary">{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
