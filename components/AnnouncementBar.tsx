import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, ImageBackground, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import styles from "@/styles/components/announcementBar";

/**
 * 公告栏
 * @constructor
 */
function AnnouncementBar() {
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
                source={require('../assets/images/announce.jpg')} // 使用 require 引入本地图片
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
}


export default AnnouncementBar;
