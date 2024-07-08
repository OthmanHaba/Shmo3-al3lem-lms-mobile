import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ProgressBar from './Progress';

const MyCourseCard = ({ course, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row p-4 rounded-lg bg-white shadow-md mb-4 items-center">
            <View className="flex-1">
                <View className="flex flex-row mb-1">
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
                    </View>
                </View>
                <ProgressBar value={10} />
            </View>

        </TouchableOpacity>
    )
}

export default MyCourseCard;
