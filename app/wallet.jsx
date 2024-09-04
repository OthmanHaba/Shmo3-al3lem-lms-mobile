import React, {useEffect} from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import {useWalletStore} from "../stores/WalletStore";
import {getWalletBalance} from "../services/WalletService";


const TransactionItem = ({ type, amount, date }) => (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <View className="flex-row items-center">
            <View className={`p-2 rounded-full ${type === 'income' ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                <MaterialIcons
                    name={type === 'income' ? 'arrow-downward' : 'arrow-upward'}
                    size={24}
                    color={type === 'income' ? 'green' : 'red'}
                />
            </View>
            <View>
                <Text className="font-primary text-lg">{type === 'income' ? 'دخل' : 'نفقات'}</Text>
                <Text className="text-gray-500">{date}</Text>
            </View>
        </View>
        <Text className={`font-primary text-lg ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {type === 'income' ? '+' : '-'} {amount} دينار
        </Text>
    </View>
);

export default function Wallet() {
    const { user } = useAuthStore();
    const router = useRouter();
    const {balance , setBalance,history,setHistory} = useWalletStore();

    useEffect(() => {
        const fetchWallet = async () => {
            const data =  await getWalletBalance()
            setBalance(data.balance);
            setHistory(data.history);
        }
    }, []);

    // Mock data for transactions
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-primary">المحفظة</Text>
                <TouchableOpacity>
                    {/*<Ionicons name="notifications-outline" size={24} color="black" />*/}
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View className="w-full bg-primray p-6 rounded-b-3xl shadow-lg">
                    <Text className="text-white font-primary text-lg mb-2">الرصيد الحالي</Text>
                    <Text className="text-white  text-4xl font-bold mb-4">{balance} دينار</Text>
                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={() => router.push('/walletTopUp')} className="bg-white py-2 px-4 rounded-full">
                            <Text className="font-primary text-primary">إضافة رصيد</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-6 px-4">
                    <Text className="font-primary text-xl  mb-4">المعاملات الأخيرة</Text>
                    {(history.length === 0) ? (
                        <View className="flex-1 justify-center items-center">
                            <Text className="text-lg text-gray-500 font-primary">لا توجد معاملات</Text>
                        </View>
                    ):(
                        <FlatList
                            data={history}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <TransactionItem {...item} />}
                            scrollEnabled={false}
                        />
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}