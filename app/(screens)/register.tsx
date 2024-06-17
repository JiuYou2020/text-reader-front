import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import styles from "@/styles/app/register";
import {useRegister} from "@/controllers/userController";

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const {handleRegister} = useRegister();

    const onRegisterPress = async () => {
        await handleRegister(username, password);
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>注册</Text>
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
                <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
                    <Text style={styles.buttonText}>注册</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/login')}>
                    <Text style={styles.linkText}>已有账号？登录</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default RegisterPage;
