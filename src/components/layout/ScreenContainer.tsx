import React from 'react';
import { SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { COLORS } from '../../constaints/hotelTheme';

interface Props {
    children: React.ReactNode;
    withScroll?: boolean;
}

const ScreenContainer = ({ children, withScroll = true }: Props) => {
    const Container: any = withScroll ? ScrollView : View;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <Container
                    style={styles.flex}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </Container>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background || '#ffffff',
    },
    flex: { flex: 1 },
});

export default ScreenContainer;
