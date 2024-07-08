import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';

const SectionHeader = ({ title, onPress }) => (
    <View className="flex flex-row mx-2 justify-between items-center mt-6 mb-2">
        <TouchableOpacity onPress={onPress}>
            <Text className="text-lg font-primary text-yellow-500">عرض الكل</Text>
        </TouchableOpacity>
        <Text className="text-lg font-primary">{title}</Text>
    </View>
);

export default SectionHeader