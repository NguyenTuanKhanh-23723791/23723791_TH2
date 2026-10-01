import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Watermark = () => (
    <View pointerEvents="none" style={styles.container}>
        <Text style={styles.text}>23723791</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.08)',
        transform: [{ rotate: '-30deg' }],
    },
});