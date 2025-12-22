import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../constaints/hotelTheme';

const LoadingOverlay: React.FC = () => (
    <View style={styles.overlay}>
        <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});

export default LoadingOverlay;
