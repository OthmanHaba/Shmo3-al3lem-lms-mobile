import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';


const TeacherItem = ({ teacher, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View className="mt-3 mx-3 flex items-center">
            <View className="w-20 h-20 rounded-full border-2 border-yellow-500 bg-transparent items-center justify-center">
                <Image
                    className="w-18 h-18 rounded-full"
                    source={{ uri: 'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk' }}
                />
            </View>
            <View className="bg-[#64748B] rounded-full px-1 py-1 mt-2">
                <Text className="text-white font-primary text-xs mt-0.5">{teacher.name}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default TeacherItem