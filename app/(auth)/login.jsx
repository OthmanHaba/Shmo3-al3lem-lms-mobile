import { View, Image, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import FormField from '../../components/FormFeild'
import { Link, useRouter } from 'expo-router'
import AppLogo from '../../assets/images/Sign in illustartion.png'
import  AuthService  from '../../services/AuthService'
import { useAuthStore } from "../../stores/authStore";

const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const setUser = useAuthStore(state => state.setUser);

    const handleSubmit = async () => {
        if (form.username === "" || form.password === "") {
            Alert.alert("خطأ", "من فضلك املأ كل الحقول");
            return;
        }

        setIsLoading(true);
        try {
            await AuthService.login({
                userName: form.username,
                password: form.password
            });
            router.replace('/(tabs)');
        } catch (e) {
            console.log(e);
            Alert.alert("خطأ", "اسم المستخدم أو كلمة المرور غير صحيحة");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <ScrollView className="bg-[#F5F5F5] mx-2">
            <View className="mt-20">
                <View className="items-center justify-center">
                    <Image source={AppLogo} />
                </View>
                <View className="">
                    <Text className="text-2xl font-primary text-right">مرحباً</Text>
                    <Text className="text-2xl font-primary text-right text-[#64748B]">تسجيل الدخول للمتابعة!</Text>
                </View>
                <FormField
                    title="اسم المستخدم"
                    value={form.username}
                    handleChangeText={(e) => setForm({ ...form, username:  e })}
                    otherStyles="mt-7"
                    placeholder={'ادخل اسم المستخدم'}
                    editable={!isLoading}
                />
                <FormField
                    title="كلمة المرور"
                    value={form.password}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    otherStyles="mt-7"
                    placeholder={'كلمة المرور'}
                    keyboardType="default"
                    secureTextEntry={true}
                    editable={!isLoading}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={isLoading}
                    className={`w-[80%] mt-8 bg-secondry rounded-full mx-auto px-4 py-2 items-center justify-center ${isLoading ? 'opacity-50' : ''}`}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className="font-primary text-white">تسجيل الدخول</Text>
                    )}
                </TouchableOpacity>
                <View className="items-center justify-center mt-2">
                    <Text className="font-primary">
                        ليس لديك حساب؟
                        <Link href={'sign-up'}><Text className="text-secondry"> سجل الان</Text></Link>
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login