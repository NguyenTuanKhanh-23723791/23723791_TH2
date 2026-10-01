import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
// SafeAreaView now imported from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { hapticImpact, hapticSelection } from '@utils/haptics';
import { COLORS } from '@constants/theme';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';
import { Product } from '@services/productApi';
import { Watermark } from '@components/Watermark';

export const DetailScreen = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { id, product } = (route.params || {}) as { id: string; product?: Product };

    const addItem = useCartStore((s) => s.addItem);

    const priceText = product
        ? Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ'
        : '';

    const handleAddToCart = () => {
        if (product) {
            addItem(product);
            try {
                if (VARIANT.hapticOnAdd === 'impact') {
                    hapticImpact();
                } else {
                    hapticSelection();
                }
            } catch (e) { }
            Alert.alert('Thành công', `Đã thêm món vào giỏ! (MSSV: ${STUDENT.mssv})`);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtn}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackLabel}>Stack (id: {id})</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.imageCard}>
                    {product?.image && (
                        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
                    )}
                </View>

                <Text style={styles.title}>{product?.title || `Món hàng #${id}`}</Text>
                <Text style={styles.price}>{priceText}</Text>
                <Text style={styles.note}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product?.description || 'Mô tả ngắn từ API (tối đa 3 dòng). Giữ nguyên id từ route.params.'}
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Thêm vào giỏ · Haptic</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    stackLabel: {
        fontSize: 12,
        color: COLORS.secondary,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    imageCard: {
        width: '100%',
        height: 180,
        backgroundColor: '#FEF3C7',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    image: {
        width: 140,
        height: 140,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 6,
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: 4,
    },
    note: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 12,
    },
    desc: {
        fontSize: 13,
        color: COLORS.textLight,
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    button: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});