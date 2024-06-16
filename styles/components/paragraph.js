import {Platform, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 19,
        marginVertical: 10,  // 增大段落间距
        lineHeight: 25,      // 行间距保持不变
        fontFamily: Platform.select({
            ios: 'System',
            android: 'System',
            default: 'System'
        }),
    },
});
export default styles;
