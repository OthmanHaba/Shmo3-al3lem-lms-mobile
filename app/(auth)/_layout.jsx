import React from 'react'
import {router, Stack} from 'expo-router';
import {useAuthStore} from "../../stores/authStore";

const AuthLayout = () => {
    const user = useAuthStore((state) => state.user);

    console.log(user);
    if (user) return router.replace('(tabs)');
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