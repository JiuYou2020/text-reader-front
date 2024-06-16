import React from 'react';
import {Text} from 'react-native';
import styles from "@/styles/components/paragraph";

interface ParagraphProps {
    text: string;
}

function Paragraph({text}: ParagraphProps) {
    return <Text style={styles.paragraph}>{'\u3000\u3000'}{text}</Text>;
}

export default Paragraph;
