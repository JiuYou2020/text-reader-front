import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams, useRouter} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState, showTip, updateReadingPosition} from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from "expo-status-bar";

function Reader() {
    const {bookId} = useLocalSearchParams<{ bookId: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const scrollViewRef = useRef<ScrollView>(null);
    const [position, setPosition] = useState<number>(0);
    const dispatch = useDispatch();
    const router = useRouter();
    const books = useSelector((state: RootState) => state.book.books);
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        dispatch(showTip('未找到书籍'));
        router.back();
        return null;
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

    const handleBackPress = useCallback(() => {
        (async () => {
            const savedPosition = position === 0 ? book.lastReadPosition || 0 : position;
            dispatch(updateReadingPosition({bookId: book.id, position: savedPosition}));
            await AsyncStorage.setItem(book.id, JSON.stringify({
                ...book,
                lastReadPosition: position,
            }));
            router.back();
        })();
        return true;
    }, [dispatch, book.id, position, router]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress]);

    const handleScroll = async (event: any) => {
        setPosition(event.nativeEvent.contentOffset.y);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Text style={styles.loadingText}>加载中...</Text>
            ) : (
                <>
                    <StatusBar style="auto" backgroundColor={styles.container.backgroundColor}/>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.scrollView}
                        onScrollEndDrag={handleScroll}
                        onMomentumScrollEnd={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <Text style={styles.contentText}>{content}</Text>
                    </ScrollView>
                </>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
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
