import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Book} from "@/constants/Book";
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {removeBook, showTip} from "@/redux/store";

interface BookActionsDrawerProps {
    book: Book;
    onClose: () => void;
}

/**
 * 书籍操作抽屉
 * @param book 书籍
 * @param onClose 关闭事件
 * @constructor
 */
const BookActionsDrawer: React.FC<BookActionsDrawerProps> = ({book, onClose}) => {
    const dispatch = useDispatch();
    // 处理上传书籍到网络的函数
    const handleUpload = () => {
        // 上传书籍到网络
    };

    // 处理从书架删除书籍的函数
    const handleDelete = async () => {
        // 从书架删除书籍，同时从store中和本地存储中删除，todo
        try {
            // 从 Redux store 中删除书籍
            dispatch(removeBook(book.id));
            // 从本地存储中删除书籍
            await AsyncStorage.removeItem(book.id);
            // 显示提示
            dispatch(showTip('删除书籍成功'));
            // 关闭抽屉
            onClose();
        } catch (error) {
            console.error('删除书籍失败', error);
            dispatch(showTip('删除书籍失败'));
        }
    };

    return (
        <Modal transparent={true} animationType="slide">
            {/* 点击非抽屉区域关闭抽屉 */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    {/* 防止点击抽屉内部时关闭抽屉 */}
                    <TouchableWithoutFeedback>
                        <View style={styles.container}>
                            <Text style={styles.title}>{book.name}</Text>
                            <Text style={styles.description}>
                                {book.description || '没有简介'}
                            </Text>
                            {/* 渲染操作按钮 */}
                            <View style={styles.buttonContainer}>
                                <ActionButton onPress={handleUpload} text="上传到网络"/>
                                <ActionButton onPress={handleDelete} text="删除书籍"/>
                                <ActionButton onPress={onClose} text="关闭"/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

/**
 * 操作按钮组件
 * @param onPress 按钮点击事件
 * @param text 按钮显示文本
 * @constructor
 */
const ActionButton: React.FC<{ onPress: () => void; text: string }> = ({onPress, text}) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: '#007bff',
        borderRadius: 5,
        flexBasis: '45%', // 两个按钮并排显示
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default BookActionsDrawer;
