import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Book} from '@/constants/Book';
import styles from '@/styles/components/bookItem';

interface BookItemProps {
    book: Book;
    onPress: (book: Book) => void;
    onPressIcon: (book: Book) => void;
}

/**
 * 书籍列表项
 * @param book 书籍
 * @param onPress 点击事件
 * @param onPressIcon 图标点击事件
 */
function BookItem({book, onPress, onPressIcon}: BookItemProps) {
    // 如果 description 不存在，使用空字符串
    const description = book.description || '';

    return (
        <TouchableOpacity onPress={() => onPress(book)} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{book.name}</Text>
                <Text style={styles.description}>
                    {description.length > 20 ? `${description.substring(0, 20)}...` : description}
                </Text>
            </View>
            <TouchableOpacity onPress={() => onPressIcon(book)} style={styles.iconButton}>
                <MaterialIcons name="more-horiz" size={24} color="black"/>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default BookItem;
