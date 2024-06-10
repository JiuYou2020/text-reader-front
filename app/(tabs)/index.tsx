import AnnouncementBar from '@/components/AnnouncementBar';
import Bookshelf from '@/components/Bookshelf';
import UploadButton from '@/components/UploadButton';
import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import TipMessage from "@/components/TipMessage";


export default function HomeScreen() {
    const scrollY = new Animated.Value(0);

    // 使用 interpolate 方法将 scrollY 转换为公告栏的高度和透明度值
    const announcementHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [200, 0], // 根据需要调整高度
        extrapolate: 'clamp',
    });

    const announcementOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });


    return (
        <View style={styles.container}>
            {/* Animated.View 包装公告栏，设置高度和透明度动画 */}
            <Animated.View
                style={[styles.announcementWrapper, {height: announcementHeight, opacity: announcementOpacity}]}>
                <AnnouncementBar/>
            </Animated.View>
            {/* Animated.ScrollView 监听滚动事件，将滚动位置更新到 scrollY 中 */}
            <Animated.ScrollView
                contentContainerStyle={styles.scrollViewContent}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
            >
                {/* 书架内容 */}
                <View style={styles.bookshelfContainer}>
                    <Bookshelf/>
                </View>
            </Animated.ScrollView>
            {/* 上传按钮 */}
            <UploadButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    announcementWrapper: {
        position: 'absolute', // 绝对定位，使其在页面顶部
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        overflow: 'hidden', // 隐藏超出部分
    },
    scrollViewContent: {
        paddingTop: 200, // 与公告栏初始高度一致
    },
    bookshelfContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
