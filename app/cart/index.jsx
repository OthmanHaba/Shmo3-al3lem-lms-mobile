import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axiosInstance from "../../utils/axios";

const CartScreen = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axiosInstance.get('/panel/cart/list');
            setCartData(response.data.data.cart);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart data:', error);
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/panel/cart/${id}`).then(res => {
                fetchCartData();
            })
        }catch (e){
            console.log(e);
            setLoading(false)
        }

    };

    const handleCheckout = () => {
        // Implement checkout logic here
        console.log('Proceeding to checkout');
    };

    const renderItem = ({ item }) => (
        <View className="flex-row bg-white p-4 mb-3 rounded-xl shadow-sm">
            <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg mr-4"
            />
            <View className="flex-1 justify-between">
                <View>
                    <Text className="text-lg font-semibold">{item.title}</Text>
                    <Text className="text-sm text-gray-600">{item.teacher_name}</Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text className="ml-1 text-sm text-gray-600">{item.rate}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-lg font-bold text-blue-600">${item.price}</Text>
                    <TouchableOpacity
                        onPress={() => removeItem(item.id)}
                        className="bg-red-500 px-3 py-2 rounded-full"
                    >
                        <Text className="text-white font-semibold">Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="p-4">
                <Text className="text-3xl  mb-6">سلة المشتريات</Text>
                {cartData && cartData.items.length > 0 ? (
                    <>
                        <FlatList
                            data={cartData.items}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            className="mb-4"
                        />
                        <View className="bg-white p-4 rounded-xl shadow-sm">
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-600">Subtotal</Text>
                                <Text className="font-semibold">${cartData.amounts.sub_total}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-600">Discount</Text>
                                <Text className="font-semibold text-green-600">-${cartData.amounts.total_discount}</Text>
                            </View>
                            <View className="flex-row justify-between mb-2">
                                <Text className="text-gray-600">Tax</Text>
                                <Text className="font-semibold">${cartData.amounts.tax_price}</Text>
                            </View>
                            <View className="border-t border-gray-200 my-2" />
                            <View className="flex-row justify-between mb-4">
                                <Text className="text-lg font-bold">Total</Text>
                                <Text className="text-lg font-bold text-blue-600">${cartData.amounts.total}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleCheckout}
                                className="bg-blue-500 py-3 rounded-lg"
                            >
                                <Text className="text-white text-center font-semibold text-lg">
                                    Complete Checkout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text className="text-center text-gray-600 mt-10">Your cart is empty</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default CartScreen;