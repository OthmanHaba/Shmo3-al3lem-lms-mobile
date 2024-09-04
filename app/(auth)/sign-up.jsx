import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormFeild';
import AppLogo from '../../assets/images/Sign in illustartion.png';
import { register, confirmOTP } from '../../services/AuthService';

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        mobile: "",
        password: "",
        password_confirmation: "",
        country_code: "+218",
    });
    const [otpForm, setOtpForm] = useState({
        code: "",
        user_id: 0,
    })
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = async () => {
        if (form.username === "" || form.mobile === "" || form.password === "" || form.confirmPassword === "") {
            Alert.alert("خطأ", "من فضلك املأ كل الحقول");
            return;
        }
        if (form.password !== form.password_confirmation) {
            Alert.alert("خطأ", "كلمة المرور غير متطابقة");
            return;
        }
        setLoading(true);
        try {
            const response = await register(form);
            if (response.success) {
                console.log(response.data.user_id);
                setOtpForm({ ...otpForm, user_id: response.data.user_id });
                setOtpSent(true);
                Alert.alert("نجاح", "تم إرسال رمز التحقق إلى رقم هاتفك");
            } else {
                Alert.alert("خطأ", response.message);
            }
        } catch (e) {
            console.error(e);
            Alert.alert("خطأ", "حدث خطأ أثناء التسجيل");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpConfirmation = async () => {

        setLoading(true);
        try {
            console.log(otpForm);
            const response = await confirmOTP(otpForm);
            if (response.success) {
                Alert.alert("نجاح", "تم تأكيد حسابك بنجاح");
                router.replace('login');
            } else {
                Alert.alert("خطأ", response.message);
            }
        } catch (e) {
            console.error(e);
            Alert.alert("خطأ", "حدث خطأ أثناء تأكيد الحساب");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5F5]">
            <ScrollView className="px-6">
                <View className="items-center justify-center my-10">
                    <Image source={AppLogo} className="w-48 h-48" resizeMode="contain" />
                </View>
                <View className="mb-8">
                    <Text className="text-3xl font-primary text-right">مرحباً</Text>
                    <Text className="text-xl text-right text-[#64748B] font-primary">أنشئ حسابك للمتابعة!</Text>
                </View>
                {!otpSent ? (
                    <>
                        <View className="flex justify-between">
                            <FormField
                                title="اسم المستخدم"
                                value={form.username}
                                handleChangeText={(text) => setForm({ ...form, username: text })}
                                placeholder="ادخل اسم المستخدم"
                            />
                            <FormField
                                title="رقم الهاتف"
                                value={form.mobile}
                                handleChangeText={(text) => setForm({ ...form, mobile: text })}
                                placeholder="رقم الهاتف"
                                keyboardType="number"
                            />
                            <FormField
                                title="كلمة المرور"
                                value={form.password}
                                handleChangeText={(text) => setForm({ ...form, password: text })}
                                placeholder="ادخل كلمة المرور"
                                secureTextEntry
                            />
                            <FormField
                                title="تأكيد كلمة المرور"
                                value={form.password_confirmation}
                                handleChangeText={(text) => setForm({ ...form, password_confirmation: text })}
                                placeholder="أعد إدخال كلمة المرور"
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={loading}
                            className="mt-8 bg-secondry rounded-full px-4 py-3 items-center justify-center"
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="font-primary text-white text-lg">إنشاء الحساب</Text>
                            )}
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <FormField
                            title="رمز التحقق"
                            value={otpForm.code}
                            handleChangeText={(text) => setOtpForm({ ...otpForm, code: text })}
                            placeholder="ادخل رمز التحقق"
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                        <TouchableOpacity
                            onPress={handleOtpConfirmation}
                            disabled={loading}
                            className="mt-8 bg-secondry rounded-full px-4 py-3 items-center justify-center"
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text className="font-bold text-white text-lg">تأكيد الحساب</Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
                <View className="items-center justify-center mt-6 mb-10">
                    <Text className="text-base font-primary">
                        لديك حساب بالفعل؟{' '}
                        <Link href="/login">
                            <Text className="text-secondry font-primary">سجل الدخول</Text>
                        </Link>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
