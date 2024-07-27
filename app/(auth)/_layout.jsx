import React from 'react'
import {Redirect, Stack} from 'expo-router';
import {useAuthStore} from "../../stores/authStore";

const AuthLayout = () => {

    const user = useAuthStore(state => state.user);
    console.log(user);
    if (Object.keys(user).length !== 0) return <Redirect href={'(tabs)'}/>
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