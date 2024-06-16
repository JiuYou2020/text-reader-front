import AnnouncementBar from '@/components/AnnouncementBar';
import BookShelf from '@/components/BookShelf';
import UploadButton from '@/components/UploadButton';
import React from 'react';
import {Animated, View} from 'react-native';
import styles from "@/styles/app/index";

function HomeScreen() {
    const scrollY = new Animated.Value(0);

    // 使用 interpolate 方法将 scrollY 转换为公告栏的高度和透明度值
    const announcementHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [200, 0], // 根据需要调整高度
        extrapolate: 'clamp',
    });

    const announcementOpacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.announcementWrapper, {height: announcementHeight, opacity: announcementOpacity}]}>
                <AnnouncementBar/>
            </Animated.View>
            <BookShelf scrollY={scrollY}/>
            <UploadButton/>
        </View>
    );
}

export default HomeScreen;
