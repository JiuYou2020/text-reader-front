import React, {useEffect, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import BookItem from './BookItem';
import BookActionsDrawer from './BookActionsDrawer';
import {Book} from '@/constants/Book';
import {useDispatch, useSelector} from "react-redux";
import {addBook, RootState, showTip} from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRouter} from "expo-router";
import styles from "@/styles/components/bookShelf";

/**
 * 书架
 * @constructor
 */
function BookShelf({scrollY}: { scrollY: Animated.Value }) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.book.books);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const stores = await AsyncStorage.multiGet(keys);
                const localBooks: Book[] = [];

                stores.forEach((store) => {
                    const value = store[1];
                    if (value) {
                        const book = JSON.parse(value);
                        if (book.id && book.name) {
                            localBooks.push(book);
                        }
                    }
                });

                const combinedBooks = [...books, ...localBooks];
                const uniqueBooks = combinedBooks.filter(
                    (book, index, self) => index === self.findIndex((b) => b.id === book.id)
                );

                uniqueBooks.forEach((book) => {
                    if (!books.find((b) => b.id === book.id)) {
                        dispatch(addBook(book));
                    }
                });
            } catch (e) {
                dispatch(showTip('加载书籍失败'));
            } finally {
                setIsLoading(false);
            }
        };

        loadBooks();
    }, [books, dispatch]);

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
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>加载中...</Text>
                </View>
            ) : books.length === 0 ? (
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
