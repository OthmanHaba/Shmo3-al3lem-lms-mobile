import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import 'react-native-reanimated';
import AuthProvider from '../contexts/AuthContext';
import {LoadingProvider, useLoading} from '../contexts/LoadingContext';

export {ErrorBoundary} from 'expo-router';

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
    }, [fontError]);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        </Stack>
    );
}

