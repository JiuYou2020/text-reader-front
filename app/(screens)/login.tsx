import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '@/redux/store';
import {useRouter} from 'expo-router';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "@/styles/app/login";

function LoginPage() {
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
}


export default LoginPage;
