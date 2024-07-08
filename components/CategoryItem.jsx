import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CategoryItem = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View className="border flex flex-row gap-1 px-4 py-2 bg-white rounded-full m-2 shadow-md">
      <AntDesign name="appstore-o" size={20} color="#FFA500" />
      <Text className="text-sm font-primary">{name}</Text>
    </View>
  </TouchableOpacity>
);

export default CategoryItem