import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';


const TeacherItem = ({ teacher, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View className="mt-3 mx-3 flex items-center">
            <View className="w-20 h-20 rounded-full border-2 border-yellow-500 items-center justify-center">
                <Image
                    className="w-18 h-18 rounded-full"
                    source={{ uri: teacher.image }}
                />
            </View>
            <View className="bg-[#64748B] rounded-full px-3 py-1 mt-2">
                <Text className="text-white font-semibold">{teacher.name}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

export default TeacherItem