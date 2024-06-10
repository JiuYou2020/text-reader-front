import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Book} from "@/constants/types";

interface BookItemProps {
    book: Book;
    onPress: (book: Book) => void;
}

/**
 * 书籍列表项
 * @param book 书籍
 * @param onPress 点击事件
 * @constructor
 */
const BookItem: React.FC<BookItemProps> = ({book, onPress}) => {
    // 如果 description 不存在，使用空字符串
    const description = book.description || '';

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.description}>
                    {description.length > 20 ? `${description.substring(0, 20)}...` : description}
                </Text>
            </View>
            <TouchableOpacity onPress={() => onPress(book)} style={styles.iconButton}>
                <MaterialIcons name="more-horiz" size={24} color="black"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    iconButton: {
        padding: 10,
    },
});

export default BookItem;
