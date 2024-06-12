import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';

interface ParagraphProps {
    text: string;
}

const Paragraph: React.FC<ParagraphProps> = ({text}) => {
    return <Text style={styles.paragraph}>{'\u3000\u3000'}{text}</Text>;
};

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

export default Paragraph;
