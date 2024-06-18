import {Platform, StyleSheet} from 'react-native';

const isAndroid = Platform.OS === 'android';

const webStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e3d8',  // 两边的背景颜色
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '60%',
        backgroundColor: '#f4f1e9',  // 字体区域的背景颜色
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    contentContainer: {
        paddingHorizontal: 30,  // 字体区域左右留有一定距离
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});

const androidStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d7e3d7',
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
    contentContainer: {},
});

const styles = isAndroid ? androidStyles : webStyles;

export default styles;
