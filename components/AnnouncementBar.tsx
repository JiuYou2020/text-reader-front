import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Animated} from 'react-native';

/**
 * 公告栏
 * @constructor
 */
const AnnouncementBar = () => {
    const [announcement, setAnnouncement] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const opacity = useState(new Animated.Value(1))[0]; // 使用 useState 创建一个 Animated.Value

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await fetch('https://your-backend-api.com/announcement');
                const data = await response.json();
                setAnnouncement(data.message);
            } catch (error) {
                console.error('Failed to fetch announcement:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, []);

    // 在组件加载时执行动画
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1, // 动画结束时的不透明度
            duration: 500, // 动画持续时间
            useNativeDriver: true, // 使用原生驱动
        }).start();
    }, [opacity]);

    return (
        <Animated.View style={[styles.container, {opacity}]}>
            {loading ? (
                <ActivityIndicator size="large" color="#fff"/>
            ) : (
                <Text style={styles.text}>{announcement || '没有公告'}</Text>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#79d5cf',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});

export default AnnouncementBar;
