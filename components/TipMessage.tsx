import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';

interface TipMessageProps {
    message: string;
    visible: boolean;
}

/**
 * 提示组件
 * @param message 提示内容
 * @param visible 是否可见
 * @constructor
 */
const TipMessage: React.FC<TipMessageProps> = ({message, visible}) => {
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            // 淡入效果
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500, // 淡入持续时间
                useNativeDriver: true,
            }).start(() => {
                // 淡出效果
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 4000, // 淡出持续时间
                    delay: 2000, // 延迟 2 秒开始淡出
                    useNativeDriver: true,
                }).start();
            });
        }
    }, [visible, opacity]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, {opacity}]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50, // 调整提示组件的位置
        left: 0,
        right: 0,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: 'rgba(219,9,46,0.8)', // 浅蓝色透明背景
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000, // 确保提示组件在前面
    },
    text: {
        color: '#333',
        fontSize: 16,
    },
});

export default TipMessage;
