import React, {useState} from 'react';
import {Animated, Text, View} from 'react-native';
import BookItem from './BookItem';
import BookActionsDrawer from './BookActionsDrawer';
import {Book} from '@/constants/Book';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "expo-router";
import styles from "@/styles/components/bookShelf";

/**
 * 书架
 * @constructor
 */
function BookShelf({scrollY}: { scrollY: Animated.Value }) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const books = useSelector((state: RootState) => state.book.books);

    const router = useRouter();
    const handleBookIconPress = (book: Book) => {
        setSelectedBook(book);
    };

    const closeDrawer = () => {
        setSelectedBook(null);
    };

    const handleBookPress = (book: Book) => {
        router.push({pathname: '/txtReader', params: {bookId: book.id}});
    }

    return (
        <View style={styles.container}>
            {books.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>书架空空如也，快去上传书籍吧！</Text>
                </View>
            ) : (
                <Animated.FlatList
                    data={books}
                    renderItem={({item}) => (
                        <BookItem book={item} onPress={handleBookPress} onPressIcon={handleBookIconPress}/>
                    )}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: false}
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                />
            )}
            {selectedBook && <BookActionsDrawer book={selectedBook} onClose={closeDrawer}/>}
        </View>
    );
}

export default BookShelf;
