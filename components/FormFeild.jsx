import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            {/* <Text className="text-base text-black font-primary">{title}</Text> */}

            <View className="w-full my-1 h-16 px-4 bg-black-100 rounded-2xl border-2 border-[#E2E8F0] focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 mx-2 text-black font-primary text-right text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                />

            </View>
        </View>
    );
};

export default FormField;
