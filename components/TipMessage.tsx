import React, {useEffect} from 'react';
import {Animated, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hideTip, RootState} from '@/redux/store';
import styles from "@/styles/components/tipMessage";

/**
 * 提示组件
 * message 提示内容
 * visible 是否可见
 * @constructor
 */
function TipMessage() {
    const {message, visible} = useSelector((state: RootState) => state.tip);
    const dispatch = useDispatch();
    const [opacity] = React.useState(new Animated.Value(0));

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
                }).start(() => {
                    dispatch(hideTip()); // 动画结束后隐藏提示
                });
            });
        }
    }, [visible, opacity, dispatch]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, {opacity}]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
}

export default TipMessage;
