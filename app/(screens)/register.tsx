import React, {useState} from 'react';
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRouter} from 'expo-router';
import axios from "axios";

const RegisterScreen = () => {
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

export default RegisterScreen;
