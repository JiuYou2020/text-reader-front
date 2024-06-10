import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useRouter} from 'expo-router';
import PersonalInfo from "@/app/(screens)/personalInfo";

export default function MyScreen() {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login'); // 跳转到登录页面
    };

    if (!isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>您还未登录</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return <PersonalInfo/>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
