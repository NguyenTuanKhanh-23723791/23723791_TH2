import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants/theme';
import { STUDENT, VARIANT } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const LoginScreen = () => {
    const [value, setValue] = useState(
        VARIANT.authField === 'email'
            ? `${STUDENT.mssv}@iuh.edu.vn`
            : `09${STUDENT.mssv.slice(-8)}`
    );
    const login = useAuthStore((s) => s.login);

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}
            <View style={styles.content}>
                <Text style={styles.logoTitle}>KTXGO</Text>
                <Text style={styles.logoSub}>Giao đồ tận phòng ký túc xá</Text>

                <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>
                        {VARIANT.authField === 'email' ? 'Email' : 'Số điện thoại'} ({VARIANT.shipFormula})
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={value}
                        onChangeText={setValue}
                        placeholder={
                            VARIANT.authField === 'email'
                                ? `Email — ${STUDENT.mssv}@iuh.edu.vn`
                                : `SĐT — 09${STUDENT.mssv.slice(-8)}`
                        }
                        keyboardType={VARIANT.authField === 'email' ? 'email-address' : 'phone-pad'}
                        autoCapitalize="none"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                <Text style={styles.hint}>Auth Stack · chưa có token</Text>
            </View>
            {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logoTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.primary,
    },
    logoSub: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 6,
        marginBottom: 36,
    },
    inputWrap: {
        width: '100%',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: '700',
        marginBottom: 4,
    },
    input: {
        fontSize: 14,
        color: COLORS.text,
        paddingVertical: 2,
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    hint: {
        marginTop: 20,
        fontSize: 12,
        color: COLORS.textLight,
    },
});