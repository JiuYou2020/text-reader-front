import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import TipMessage from './TipMessage'; // 导入 TipMessage 组件


/**
 * 上传按钮
 * @constructor
 */
const UploadButton = () => {
    const [tipVisible, setTipVisible] = useState(false);
    const [tipMessage, setTipMessage] = useState('');

    const showTip = (message: string) => {
        setTipMessage(message);
        setTipVisible(true);
        console.log('showTip' + message)
        // 隐藏提示消息（重置状态），可以在提示完全消失后调用
        setTimeout(() => {
            setTipVisible(false);
        }, 6000); // 6秒后重置
    };

    const handleUpload = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'text/plain',
        });

        if (result.canceled) {
            showTip('取消上传');
        } else {
            // 上传本地书籍到后端并加载到书架上
            showTip('上传成功');
        }
    };

    return (
        <View>
            <TipMessage message={tipMessage} visible={tipVisible}/>
            <TouchableOpacity style={styles.button} onPress={handleUpload}>
                <AntDesign name="plus" size={24} color="white"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#0fcfe0',
        padding: 20,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UploadButton;
