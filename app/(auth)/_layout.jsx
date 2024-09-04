import React, {useEffect} from 'react'
import {Redirect, Stack} from 'expo-router';
import {useAuthStore} from "../../stores/authStore";
import AuthService from "../../services/AuthService";
import {useExpoRouter} from "expo-router/build/global-state/router-store";

const AuthLayout = () => {

    const {user, setUser} = useAuthStore();

    useEffect(() => {
        const checkUser = async () => {
            const data = await AuthService.getUser();
            if (data.user) {
                setUser(user);
                return <Redirect href="/(tabs)/"/>
            }
        }
        checkUser();

    }, []);
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="sign-up"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

        </>
    );
}

export default AuthLayout
