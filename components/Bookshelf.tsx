import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import BookItem from './BookItem';
import BookActionsDrawer from './BookActionsDrawer';
import {Book} from '@/constants/types';

/**
 * 书架
 * @constructor
 */
const Bookshelf = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const books: Book[] = [
        {id: '1', title: 'Book 1'},
        {id: '2', title: 'Book 2'},
        {id: '3', title: 'Book 3'},
        {id: '4', title: 'Book 4'},
        {id: '5', title: 'Book 5'},
        {id: '6', title: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        // 更多书籍
    ];

    const handleBookPress = (book: Book) => {
        setSelectedBook(book);

    };

    const closeDrawer = () => {
        setSelectedBook(null);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={({item}) => (
                    <BookItem book={item} onPress={handleBookPress}/>
                )}
                keyExtractor={(item) => item.id}
            />
            {selectedBook && <BookActionsDrawer book={selectedBook} onClose={closeDrawer}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default Bookshelf;
