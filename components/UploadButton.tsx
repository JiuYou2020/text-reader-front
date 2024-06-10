import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import {useDispatch} from "react-redux";
import {showTip} from "@/redux/store";

/**
 * 上传按钮
 * @constructor
 */
const UploadButton = () => {
    const dispatch = useDispatch();

    // 处理文件上传的函数
    const handleUpload = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'text/plain',
        });

        if (result.canceled) {
            dispatch(showTip('取消上传')); // 使用提示组件显示取消上传信息
        } else {
            // 上传本地书籍到后端并加载到书架上
            dispatch(showTip('上传成功')); // 使用提示组件显示上传成功信息
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <AntDesign name="plus" size={24} color="white"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#007bff',
        padding: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UploadButton;
