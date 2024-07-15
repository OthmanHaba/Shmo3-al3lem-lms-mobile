import React from 'react'
import { Stack } from 'expo-router';
import { useAuthContext } from '../../contexts/AuthContext';

const AuthLayout = () => {
    const { user } = useAuthContext();

    if (user) return <Redirect href="(tabs)" />;
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