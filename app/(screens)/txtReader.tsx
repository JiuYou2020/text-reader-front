import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLocalSearchParams, useRouter} from "expo-router";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

function Reader() {
    const {bookId} = useLocalSearchParams<{ bookId: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const scrollViewRef = useRef<ScrollView>(null);
    const books = useSelector((state: RootState) => state.book.books);
    const book = books.find((b) => b.id === bookId);
    const router = useRouter();

    if (!book) {
        throw new Error('Book not found');
    }

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // 从store.js中获取书籍信息
                const response = await fetch(book.localUri || '');
                const text = await response.text();
                setContent(text);

                // 定位到上次阅读的位置
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

        fetchContent();
    }, [book]);

    const handleScroll = async (event: any) => {
        book.lastReadPosition = event.nativeEvent.contentOffset.y;
        await AsyncStorage.setItem(book.id, JSON.stringify(book));
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>加载中...</Text>
            ) : (
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    onScrollEndDrag={handleScroll}
                    onMomentumScrollEnd={handleScroll}
                    scrollEventThrottle={16}
                >
                    <Text style={styles.contentText}>{content}</Text>
                </ScrollView>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        margin: 10,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999',
    },
    scrollView: {
        padding: 15,
    },
    contentText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
    },
});

export default Reader;
