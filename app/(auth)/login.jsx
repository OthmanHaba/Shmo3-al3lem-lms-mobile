import { View, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import FormField from '../../components/FormFeild'
import { Link, router } from 'expo-router'
import AppLogo from '../../assets/images/Sign in illustartion.png'

const login = () => {

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "من فضلك املأ كل الحقول");
        }
        router.replace('(tabs)')
    }


    return (
        <ScrollView className="bg-[#F5F5F5]">
            <View className="mt-20">
                <View className="items-center justify-center">
                    <Image
                        source={AppLogo}
                    />
                </View>
                <View className="">
                    <Text className="text-2xl font-primary text-right">مرحباً</Text>
                    <Text className="text-2xl font-primary text-right text-[#64748B]">تسجيل الدخول للمتابعة!</Text>
                </View>
                <FormField
                    title="اسم المستخدم"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    otherStyles="mt-7"
                    placeholder={'ادخل اسم المستخدم'}
                    keyboardType="email-address"

                />
                <FormField
                    title="Email"
                    value={form.password}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    otherStyles="mt-7"
                    placeholder={'كلمة المرور'}
                    keyboardType="email-address"

                />

                <TouchableOpacity onPress={handleSubmit} className="w-[80%] mt-8  bg-secondry rounded-full mx-auto px-4 py-2 items-center justify-center">
                    <Text className="font-primary text-white">تسجيل الدخول</Text>
                </TouchableOpacity>
                <View className="items-center justify-center mt-2">
                    <Text className="font-primary">
                        ليس لديك حساب؟
                        <Link href={'sign-up'}><Text className="text-secondry">,سجل الان </Text></Link>
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default login