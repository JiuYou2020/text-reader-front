import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 300, // 设置公告栏的高度
        width: 'auto', // 确保公告栏宽度为100%
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 4,
        boxShadow: '0 2px 3px rgba(0,0,0,0.3)',
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

export default styles;
