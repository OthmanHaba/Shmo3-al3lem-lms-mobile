import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, RefreshControl, Image} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const CategoryItem = ({name, iconUri, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View className="border flex flex-row gap-1 px-4 py-2 bg-white rounded-full m-2 shadow-md">
            <Image className="w-5 h-5" resizeMode={'contain'} source={{uri: iconUri}}/>
            <Text className="text-sm font-primary">{name}</Text>
        </View>
    </TouchableOpacity>
);

export default CategoryItem