import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Platform, ScrollView, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateReadingPosition} from "@/redux/store";
import {StatusBar} from "expo-status-bar";
import Paragraph from "@/components/Paragraph";
import {fetchBookFromStorage, saveBookToStorage} from "@/utils/bookStorage";
import {Book} from "@/constants/Book";
import styles from "@/styles/app/txtReader";

function ReaderPage() {
    const {bookId} = useLocalSearchParams<{ bookId: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const scrollViewRef = useRef<ScrollView>(null);
    const [position, setPosition] = useState<number>(0);
    const dispatch = useDispatch();
    const router = useRouter();
    const books = useSelector((state: RootState) => state.book.books);
    const [book, setBook] = useState<Book | null>(books.find((b) => b.id === bookId) || null);

    const isWeb = Platform.OS === 'web';

    const handleBackPress = useCallback(() => {
        (async () => {
            if (!book) return;
            const savedPosition = position === 0 ? book.lastReadPosition || 0 : position;
            dispatch(updateReadingPosition({bookId: book.id, position: savedPosition}));
            await saveBookToStorage({...book, lastReadPosition: position});
            router.back();
        })();
        return true;
    }, [dispatch, book, position, router]);

    const handleScroll = (event: any) => {
        setPosition(event.nativeEvent.contentOffset.y);
    };

    const renderContent = () => {
        return content.split('\n')
            .filter(paragraph => paragraph.trim().length > 0)
            .map((paragraph, index) => (
                <Paragraph key={index} text={paragraph.trim()}/>
            ));
    };

    useEffect(() => {
        const initializeBook = async () => {
            if (!book) {
                const storedBook = await fetchBookFromStorage(typeof bookId === "string" ? bookId : '');
                if (storedBook) {
                    setBook(storedBook);
                }
            }
        };
        initializeBook();
    }, [book, bookId]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                if (!book) return;
                const response = await fetch(book.localUri || '');
                const text = await response.text();
                setContent(text);

                const lastReadPosition = book.lastReadPosition || 0;
                setTimeout(() => {
                    scrollViewRef.current?.scrollTo({y: lastReadPosition, animated: false});
                }, 100);
            } catch (error) {
                console.error('Failed to load book content:', error);
            } finally {
                setLoading(false);
            }
        };

        if (book) {
            fetchContent();
        }
    }, [book]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]);

    return (
        <View style={isWeb ? styles.webContainer : styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>加载中...</Text>
            ) : (
                <>
                    <StatusBar style="auto" backgroundColor={styles.container.backgroundColor}/>
                    <View style={isWeb ? styles.webScrollViewContainer : styles.scrollViewContainer}>
                        <ScrollView
                            ref={scrollViewRef}
                            style={isWeb ? styles.webScrollView : styles.scrollView}
                            contentContainerStyle={isWeb ? styles.webContentContainer : undefined}
                            onScrollEndDrag={handleScroll}
                            onMomentumScrollEnd={handleScroll}
                            scrollEventThrottle={16}
                        >
                            {renderContent()}
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
}

export default ReaderPage;
