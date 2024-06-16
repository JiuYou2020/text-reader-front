import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {useRouter} from 'expo-router';
import PersonalInfo from "@/app/(screens)/personalInfo";
import styles from "@/styles/app/my";


function MyScreen() {
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

export default MyScreen;
