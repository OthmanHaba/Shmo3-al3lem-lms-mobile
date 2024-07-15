import {useFonts} from 'expo-font';
import {router, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';
import {loadUser} from '../services/AuthService';
import AuthProvider from '../contexts/AuthContext';

export {
    ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
    });
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }

        async function runEffect() {
            try {
                const user = await loadUser();
                if (!user) return router.push('(auth)/login');
                setUser(user);
            } catch (e) {
                // console.log(e);
                return router.push('(auth)/login');
            }
        }

        runEffect();
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </AuthProvider>
    );
}

