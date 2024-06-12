import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // 正确导入 ImagePicker
import {useDispatch, useSelector} from 'react-redux';
import {login, RootState, showTip, updateUser} from '@/redux/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";

export default function PersonalInfo() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null); // 用于存储头像的状态
    const [username, setUsername] = useState(user.username || ''); // 昵称状态
    const [password, setPassword] = useState(user.password || ''); // 密码状态
    const [userId, setUserId] = useState(user.accountId || ''); // 用户ID状态

    useEffect(() => {
        if (user.accountId) {
            console.log('用户已登录');
            setUsername(user.username || '');
            setPassword(user.password || '');
            setUserId(user.accountId || '');
        } else {
            console.log('用户未登录1');
            // 从本地存储中获取用户信息
            AsyncStorage.getItem('user').then((data) => {
                if (data) {
                    const {username, accountId, password} = JSON.parse(data);
                    setUsername(username);
                    setPassword(password);
                    setUserId(accountId);
                }
            });
            if (!user.accountId) {
                console.log('用户已登录2');
                router.replace("/my");
                return;
            }
            dispatch(login({username, accountId: userId, password}));
        }
    }, [user]);

    // 选择图片函数
    const pickImage = async () => {
        // 请求权限
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        // 从图库选择图片
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // 1:1 的宽高比
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // 设置选择的图片URI
        }
    };

    const handleSave = () => {
        // 保存修改，发送请求到后端
        console.log('保存修改:', {accountId: user.accountId, username, password});
        dispatch(updateUser({username, password}));
        dispatch(showTip('保存成功'));
    };

    const defaultImage = require('@/assets/images/avatar-placeholder.png');
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* 点击头像上传修改 */}
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={image ? {uri: image} : defaultImage} style={styles.avatar}/>
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                    <Text style={styles.row}>ID: {userId}</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>昵称:</Text>
                        {/* 昵称输入框 */}
                        <TextInput
                            style={[styles.input, styles.underlineInput]}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>密码:</Text>
                        {/* 密码输入框 */}
                        <TextInput
                            style={[styles.input, styles.underlineInput]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>保存修改</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40, // 调整整体位置上移
    },
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e1e1e1',
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15, // 调整行间距确保一致
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    underlineInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderWidth: 0,
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
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
});
