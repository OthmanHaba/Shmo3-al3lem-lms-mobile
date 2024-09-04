import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const FONTS = {
    "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
};

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts(FONTS);

    useEffect(() => {
        if (fontError) {
            console.error('Font loading error:', fontError);
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontError, fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="wallet" options={{ headerShown: false }} />
            <Stack.Screen name="course/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="all" options={{ headerShown: false }} />
            <Stack.Screen name="cart/index" options={{ headerShown: false }} />
            <Stack.Screen name="walletTopUp" options={{ headerShown: false }} />
            <Stack.Screen name="course/playableCourses/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="course/playableCourses/vedio/[fileID]" options={{ headerShown: false }} />
        </Stack>
    );
}
