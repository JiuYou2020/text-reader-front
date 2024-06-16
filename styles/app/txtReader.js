import {Platform, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Platform.select({
            android: '#d7e3d7',
            web: '#f1eee6'
        }),
        padding: 10,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
    scrollViewContainer: {
        flex: 1,
    },
    scrollView: {
        padding: 15,
        flex: 1,
    },
    contentText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#e7e3d8',  // 两边的背景颜色
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webScrollViewContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webScrollView: {
        width: '60%',
        backgroundColor: '#f4f1e9',  // 字体区域的背景颜色
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    webContentContainer: {
        paddingHorizontal: 30,  // 字体区域左右留有一定距离
    },
});

export default styles;
