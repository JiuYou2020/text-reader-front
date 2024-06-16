import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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

export default styles;
