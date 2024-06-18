import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // 正确导入 ImagePicker
import {useDispatch, useSelector} from 'react-redux';
import {RootState, showTip, updateUser} from '@/redux/store';
import {useRouter} from "expo-router";
import styles from "@/styles/app/personInfo";

function PersonalInfoPage() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null); // 用于存储头像的状态
    const [username, setUsername] = useState(user.username || ''); // 昵称状态
    const [password, setPassword] = useState(user.password || ''); // 密码状态
    const [userId, setUserId] = useState(user.accountId || ''); // 用户ID状态

    useEffect(() => {
        if (user.isLoggedIn) {
            console.log('用户已登录');
            setUsername(user.username || '');
            setPassword(user.password || '');
            setUserId(user.accountId || '');
        } else {
            router.replace("/my");
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
        // todo 上传图片到服务器
    };

    const handleSave = () => {
        // todo 保存修改，发送请求到后端
        console.log('保存修改:', {accountId: user.accountId, username, password});
        dispatch(updateUser({username, password}));
        dispatch(showTip('保存成功'));
    };

    const defaultImage = require('../../assets/images/avatar-placeholder.png');
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* 点击头像上传修改 */}
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={defaultImage} style={styles.avatar}/>
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

export default PersonalInfoPage;
