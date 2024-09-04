import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {topUpWallet} from "../services/WalletService";

const WalletTopUp = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [topUpMethod, setTopUpMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleTopUp = async () => {
        // Simulating API call
        try {
            await topUpWallet({
                "anis_voucher_code": cardNumber,
                "gateway": 46
            })
            setStatus('success');
        } catch (e) {
            Alert.alert('حدث خطأ ما');
            setStatus('failed');
        }
        setStep(4);
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View className="p-6">
                        <Text className="text-2xl font-primary mb-6 text-center">اختر طريقة الشحن</Text>
                        <TouchableOpacity
                            className="bg-primray p-4 rounded-lg mb-4 flex-row items-center justify-between"
                            onPress={() => {
                                setTopUpMethod('card');
                                setStep(2);
                            }}
                        >
                            <Text className="text-white text-lg">إدخال بطاقة</Text>
                            <FontAwesome5 name="credit-card" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-secondry p-4 rounded-lg flex-row items-center justify-between"
                            onPress={() => {
                                setTopUpMethod('tlink');
                                // Implement tlink logic here
                            }}
                        >
                            <Text className="text-white text-lg ">خدمة tlink</Text>
                            <MaterialCommunityIcons name="link-variant" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                );
            case 2:
                return (
                    <View className="p-6">
                        <Text className="text-2xl mb-6 text-center">أدخل تفاصيل البطاقة</Text>
                        <TextInput
                            className="bg-gray-100 p-4 rounded-lg mb-4"
                            placeholder="رقم البطاقة"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                        />
                        <TouchableOpacity
                            className="bg-primray p-4 rounded-lg"
                            onPress={() => setStep(3)}
                        >
                            <Text className="text-white text-lg  text-center">متابعة</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 3:
                return (
                    <View className="p-6">
                        <Text className="text-2xl  mb-6 text-center">تأكيد الشحن</Text>
                        <Text className="text-lg mb-6">رقم البطاقة: {cardNumber}</Text>
                        <TouchableOpacity
                            className="bg-primray p-4 rounded-lg"
                            onPress={handleTopUp}
                        >
                            <Text className="text-white text-lg  text-center">تأكيد الشحن</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 4:
                return (
                    <View className="p-6 items-center">
                        {status === 'success' ? (
                            <>
                                <AntDesign name="checkcircle" size={64} color="green" />
                                <Text className="text-2xl  mt-4 mb-6 text-center">تم الشحن بنجاح</Text>
                            </>
                        ) : (
                            <>
                                <AntDesign name="closecircle" size={64} color="red" />
                                <Text className="text-2xl  mt-4 mb-6 text-center">فشل الشحن</Text>
                            </>
                        )}
                        <TouchableOpacity
                            className="bg-primary p-4 rounded-lg w-full"
                            onPress={() => router.push('/wallet')}
                        >
                            <Text className="text-white text-lg  text-center">العودة إلى المحفظة</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl ">شحن المحفظة</Text>
                    <View style={{ width: 24 }} />
                </View>
                {renderStep()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default WalletTopUp;