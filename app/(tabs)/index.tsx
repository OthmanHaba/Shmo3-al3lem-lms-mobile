import { View, Text, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
    return (
        <SafeAreaView className="flex-1">
            <View className="mt-6 flex-row justify-between items-center mx-4">
                <Text className="text-xl text-left">
                    مرحبا بك
                </Text>
                <View className="flex-row gap-1 items-center">
                    <Text>
                        cart
                    </Text>
                    <Text>
                        wallet
                    </Text>
                    <Image
                        className="w-10 h-10 rounded-3xl"
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                </View>
            </View>
            <View className="bg-red-500 mx-4 my-2 h-1/6 rounded-xl">
                <View className="m-4">
                    <Text >
                        add title
                    </Text>
                </View>
                <View className="m-4">
                    <Text>
                        Add body
                    </Text>
                </View>
            </View>

            <View>

            </View>

        </SafeAreaView>
    );
}
