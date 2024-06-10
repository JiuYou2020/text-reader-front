import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // 正确导入 ImagePicker

export default function PersonalInfo() {
    const [image, setImage] = useState<string | null>(null); // 用于存储头像的状态
    const [accountId, setAccountId] = useState('123456'); // 账户ID状态
    const [nickname, setNickname] = useState('John Doe'); // 昵称状态
    const [password, setPassword] = useState('password'); // 密码状态

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
        console.log('保存修改:', {accountId, nickname, password});
        alert('修改已保存');
    };

    const defaultImage = require('@/assets/images/avatar-placeholder.png');
    return (
        <View style={styles.container}>
            {/* 点击头像上传修改 */}
            <TouchableOpacity onPress={pickImage}>
                <Image source={image ? {uri: image} : defaultImage} style={styles.avatar}/>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.row}>ID: {accountId}</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>昵称:</Text>
                    {/* 昵称输入框 */}
                    <TextInput
                        style={[styles.input, styles.underlineInput]}
                        value={nickname}
                        onChangeText={setNickname}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60, // 调整整体位置上移
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        backgroundColor: '#e1e1e1',
    },
    infoContainer: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    row: {
        fontSize: 16,
        color: '#333',
        marginRight: 10,
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
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
