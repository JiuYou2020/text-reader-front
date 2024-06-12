import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

/**
 * 公告栏
 * @constructor
 */
const AnnouncementBar = () => {
    const [announcement, setAnnouncement] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const opacity = useState(new Animated.Value(1))[0];

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get('http://localhost:8080/notification/announce', {timeout: 3000});
                const announcement: string = response.data.data;
                console.log('Fetched announcement:', announcement);
                setAnnouncement(announcement);
            } catch (error) {
                console.error('Failed to fetch announcement:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, []);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [opacity]);

    const truncatedAnnouncement = announcement && announcement.length > 100
        ? `${announcement.substring(0, 100)}...`
        : announcement;

    return (
        <Animated.View style={[styles.container, {opacity}]}>
            <ImageBackground
                source={require('/home/code/React/project/txt-reader/assets/images/announce.jpg')} // 使用 require 引入本地图片
                style={styles.background}
                imageStyle={styles.backgroundImage}
            >
                <View style={styles.content}>
                    <View style={styles.iconTextWrapper}>
                        <Text style={styles.announcementText}>公告</Text>
                        <Icon name="campaign" size={24} color="#0fcfe0"/>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff"/>
                    ) : (
                        <Text style={styles.text}>{truncatedAnnouncement || '没有公告'}</Text>
                    )}
                </View>
            </ImageBackground>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "auto", // 设置公告栏的高度
        width: 'auto', // 确保公告栏宽度为100%
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        overflow: 'hidden',
    },
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    content: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    iconTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    announcementText: {
        fontSize: 24,
        color: '#0fcfe0',
        marginRight: 4,
    },
    text: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginTop: 50, // 根据需要调整位置
    },
});

export default AnnouncementBar;
