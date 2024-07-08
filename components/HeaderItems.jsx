import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Carousel from "react-native-reanimated-carousel";

const HeaderComponent = ({ user, onCartPress, onWalletPress, onProfilePress, promotions }) => {
  const width = Dimensions.get('window').width;

  return (
    <View className="mb-4">
      <View className="flex  mt-3 mx-4 flex-row justify-between items-center">
        <Text className="text-2xl  font-primary">مرحبا {user}</Text>
        <View className="flex flex-row gap-4 items-center">
          <TouchableOpacity onPress={onCartPress} className="bg-gray-100 p-2 rounded-full">
            <AntDesign name="shoppingcart" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onWalletPress} className="bg-gray-100 p-2 rounded-full">
            <AntDesign name="wallet" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onProfilePress}>
            <Image
              className="h-10 w-10 rounded-full"
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={promotions}
        scrollAnimationDuration={6000}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(`Promotion ${item.id} pressed`)}>
            <Image
            className="w-[90vw] mx-auto"
              source={require('../assets/images/Promotion Card.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HeaderComponent;