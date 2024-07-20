import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

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
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontError,fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
    );
}

