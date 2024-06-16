import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import {useDispatch} from 'react-redux';
import {addBook, showTip} from '@/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "@/styles/components/uploadButton";

/**
 * 上传按钮
 * @constructor
 */
function UploadButton() {
    const dispatch = useDispatch();

    const handleUpload = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'text/plain',
        });

        if (result.canceled) {
            dispatch(showTip('取消上传'));
        } else {
            const {uri, name, size} = result.assets[0];

            const book = {
                id: Date.now().toString(),
                name,
                size,
                syncedToCloud: false,
                lastReadPosition: 0,
                localUri: uri,
            };

            // 保存书籍信息到本地存储
            await AsyncStorage.setItem(book.id, JSON.stringify(book));
            dispatch(addBook(book));
            dispatch(showTip('上传成功'));
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <AntDesign name="plus" size={24} color="white"/>
        </TouchableOpacity>
    );
}

export default UploadButton;
