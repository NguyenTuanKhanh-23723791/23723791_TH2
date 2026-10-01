import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants/theme';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { useAuthStore } from '@stores/authStore';
import { useCartStore } from '@stores/cartStore';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { Watermark } from '../components/Watermark';

export const MeScreen = () => {
    const logout = useAuthStore((s) => s.logout);
    const setShippingFee = useCartStore((s) => s.setShippingFee);
    const { status, distanceKm, calculatedFee, requestAndGetFee, openSettings } =
        useCampusLocation();

    const handleGetLocation = async () => {
        const fee = await requestAndGetFee();
        if (fee !== null) {
            setShippingFee(fee);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.sub}>{STUDENT.mssv} · #{examStamp()}</Text>

                <View style={styles.card}>
                    <Text
                        style={[
                            styles.statusText,
                            { color: status === 'granted' ? COLORS.success : COLORS.error },
                        ]}>
                        Quyền: {status}
                    </Text>

                    {distanceKm !== null && (
                        <Text style={styles.infoText}>
                            ≈ {distanceKm.toFixed(1)} km tới cổng KTX
                        </Text>
                    )}

                    <Text style={styles.feeLabel}>Phí ship ước tính</Text>
                    <Text style={styles.feeValue}>
                        {calculatedFee !== null
                            ? `${calculatedFee.toLocaleString('vi-VN')} đ`
                            : '-- đ'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={handleGetLocation}>
                    <Text style={styles.primaryBtnText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                {status === 'blocked' && (
                    <TouchableOpacity style={styles.outlineBtn} onPress={openSettings}>
                        <Text style={styles.outlineBtnText}>Mở Cài đặt (blocked)</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Text style={styles.logoutBtnText}>Đăng xuất</Text>
                </TouchableOpacity>
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
    header: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    sub: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 20,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 20,
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    infoText: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    feeLabel: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    feeValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: 2,
    },
    primaryBtn: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    primaryBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    outlineBtn: {
        width: '100%',
        borderColor: COLORS.primary,
        borderWidth: 1.5,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    outlineBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    logoutBtn: {
        width: '100%',
        backgroundColor: COLORS.error,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});