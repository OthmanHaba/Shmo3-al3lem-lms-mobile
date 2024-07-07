import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';

const SectionHeader = ({ title, onPress }) => (
    <View className="flex flex-row mx-2 justify-between items-center mt-6">
        <TouchableOpacity onPress={onPress}>
            <Text className="text-xl text-yellow-500">عرض الكل</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold">{title}</Text>
    </View>
);

export default SectionHeader