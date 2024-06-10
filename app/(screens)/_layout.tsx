import {Stack} from 'expo-router';
import React from "react";

export default function ScreenLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerShown: false}}/>
            <Stack.Screen name="register" options={{headerShown: false}}/>
            <Stack.Screen name="personalInfo" options={{headerShown: false}}/>
        </Stack>
    );
}
