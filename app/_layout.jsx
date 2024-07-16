import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import AuthProvider from '../contexts/AuthContext';
import { LoadingProvider, useLoading } from '../contexts/LoadingContext';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const FONTS = {
    "Cairo-Regular": require("../assets/fonts/Cairo-Regular.ttf"),
};

function LoadingOverlay() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

function RootLayoutContent() {
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
        <AuthProvider>
            <Stack onLayout={onLayoutRootView}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <LoadingOverlay />
        </AuthProvider>
    );
}

export default function RootLayout() {
    return (
        <LoadingProvider>
            <RootLayoutContent />
        </LoadingProvider>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});