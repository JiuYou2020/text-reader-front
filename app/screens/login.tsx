import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '@/redux/store';
import {useRouter} from 'expo-router';
import axios from "axios";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // 发送登录请求到后端
            const response = await axios.post('https://your-backend-api.com/login', {
                username,
                password
            });
            if (response.status === 200) {
                dispatch(login(username));
            } else {
                alert('登录失败');
            }
        } catch (error) {
            console.error('登录失败', error);
            alert('登录失败');
        }
    };

    return (
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace('/screens/register')}>
                <Text style={styles.linkText}>没有账号？注册</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
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
    linkText: {
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
