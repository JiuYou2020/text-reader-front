import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50, // 调整提示组件的位置
        left: 0,
        right: 0,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: 'rgba(249,48,77,0.8)', // 浅蓝色透明背景
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

export default styles;
