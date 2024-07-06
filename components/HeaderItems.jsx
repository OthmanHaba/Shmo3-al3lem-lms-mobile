import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Carousel from "react-native-reanimated-carousel";


function HeaderComponent() {
    const width = Dimensions.get('window').width;
    [user, setUser] = useState('othman')

    return (
        <View className="">
            <View className="flex mt-3 mx-2 flex-row justify-between items-center">
                <Text className="text-2xl">{user} مرحبا</Text>
                <View className="flex flex-row gap-2 items-center">
                    <TouchableOpacity>
                        <AntDesign name="shoppingcart" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="wallet" size={20} color="black" />
                    </TouchableOpacity>

                    <Image
                        className="h-10 w-10 rounded-3xl"
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png'
                        }}
                    />
                </View>
            </View>
            <FlatList
                // className="mt-3 mb-3 "
                // width={width}
                // height={width / 2}
                autoPlay={true}
                data={[...new Array(2).keys()]}
                contentContainerStyle={{ columnGap: 10 }}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View>
                        <TouchableOpacity>
                            <Image
                                resizeMode="contain"
                                source={require(
                                    '../assets/images/Promotion Card.png'
                                )}
                            />
                        </TouchableOpacity>

                    </View>
                )}
                horizontal
            />


        </View>
    )
}


export default HeaderComponent