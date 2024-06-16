import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import axios from "axios";
import styles from "@/styles/app/register";

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            console.log('Sending registration request');
            const response = await axios.post('http://localhost:8080/user/users/register', {
                username,
                password
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response received', response);

            const {success, errCode, errMessage} = response.data;

            if (success) {
                router.replace('/login');
                alert("注册成功");
            } else {
                alert(`注册失败: ${errMessage} (错误代码: ${errCode})`);
            }
        } catch (error) {
            console.error('注册失败', error);
            alert('注册失败');
        }
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
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
