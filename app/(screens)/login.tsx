import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '@/redux/store';
import {useRouter} from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            // 构建登录请求URL
            const url = `http://localhost:8080/user/users/login?username=${username}&password=${password}`;
            // 发送登录请求到后端
            const response = await axios.get(url);
            // 解析响应
            const {success, errCode, errMessage, data} = response.data;

            if (success) {
                const userId = data;

                // 登录成功后更新 Redux 状态和 AsyncStorage
                dispatch(login({username, accountId: userId, password}));
                await AsyncStorage.setItem('user', JSON.stringify({username, accountId: userId, password}));

                // 登录成功后导航到个人信息页面
                router.replace('/personalInfo');
            } else {
                alert(`登录失败: ${errMessage} (错误代码: ${errCode})`);
            }
        } catch (error) {
            console.error('登录失败', error);
            alert('登录失败');
        }
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>登录</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.replace('/register')}>
                    <Text style={styles.linkText}>没有账号？注册</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        ...Platform.select({
            web: {
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            },
        }),
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        ...Platform.select({
            web: {
                color: '#00796b',
                fontFamily: 'Arial, sans-serif',
            },
        }),
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        ...Platform.select({
            web: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            },
        }),
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        ...Platform.select({
            web: {
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            },
        }),
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: '#007bff',
        textDecorationLine: 'underline',
        ...Platform.select({
            web: {
                cursor: 'pointer',
            },
        }),
    },
});

export default LoginScreen;
