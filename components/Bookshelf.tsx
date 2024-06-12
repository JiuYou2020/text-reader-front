import React, {useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import BookItem from './BookItem';
import BookActionsDrawer from './BookActionsDrawer';
import {Book} from '@/constants/Book';

/**
 * 书架
 * @constructor
 */
const Bookshelf = ({scrollY}: { scrollY: Animated.Value }) => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const books: Book[] = [
        {id: '1', name: 'Book 1'},
        {id: '2', name: 'Book 2'},
        {id: '3', name: 'Book 3'},
        {id: '4', name: 'Book 4'},
        {id: '5', name: 'Book 5'},
        {id: '6', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '7', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '8', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '9', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '10', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '11', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '12', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
        {id: '13', name: '恋爱在精神病院', description: '恋爱在精神病院最新作品'},
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
            <Animated.FlatList
                data={books}
                renderItem={({item}) => (
                    <BookItem book={item} onPress={handleBookPress}/>
                )}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContent}
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
    scrollViewContent: {
        paddingTop: 200, // 与公告栏初始高度一致
    },
});

export default Bookshelf;
