import {useFonts} from 'expo-font';
import {Slot, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import store from '@/redux/store'; // 导入 Redux store
import TipMessage from '@/components/TipMessage'; // 导入 TipMessage 组件
import {useColorScheme} from '@/hooks/useColorScheme';
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                </Stack>
            </ThemeProvider>
            {/*<TipMessage/> /!* 全局提示组件 *!/*/}
        </Provider>
    );
}
