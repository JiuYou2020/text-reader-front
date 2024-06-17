import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import styles from "@/styles/app/login";
import {useLogin} from "@/controllers/userController";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const {handleLogin} = useLogin();
    const onLoginPress = async () => {
        await handleLogin(username, password);
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>登录</Text>
                <TextInput
                    style={styles.input}
                    placeholder="用户名"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="密码"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/register')}>
                    <Text style={styles.linkText}>没有账号？注册</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default LoginPage;
