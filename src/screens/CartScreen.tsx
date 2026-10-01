import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants/theme';
import { ROOM_LABEL, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';

export const CartScreen = () => {
    const { items, removeItem, changeQty, totalAmount, shippingFee } = useCartStore();

    const total = totalAmount();
    const grandTotal = total + (shippingFee || 0);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.product.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
                    </View>
                }
                renderItem={({ item }) => {
                    const itemTotal =
                        Math.round(item.product.price * PRICE_MULTIPLIER) * item.quantity;
                    return (
                        <View style={styles.cartCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.itemTitle} numberOfLines={1}>
                                    {item.product.title}
                                </Text>
                                <Text style={styles.itemSub}>
                                    ×{item.quantity} · {itemTotal.toLocaleString('vi-VN')} đ
                                </Text>
                                <View style={styles.qtyRow}>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => changeQty(item.product.id, -1)}>
                                        <Text style={styles.qtyBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => changeQty(item.product.id, 1)}>
                                        <Text style={styles.qtyBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.delBtn}
                                onPress={() => removeItem(item.product.id)}>
                                <Text style={styles.delBtnText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                ListFooterComponent={
                    <View style={styles.summaryWrap}>
                        <View style={styles.feeBox}>
                            <Text style={styles.feeLabel}>Giao đến {ROOM_LABEL}</Text>
                            <Text style={styles.feeValue}>
                                Phí ship:{' '}
                                {shippingFee !== null
                                    ? `${shippingFee.toLocaleString('vi-VN')} đ (công thức ${VARIANT.shipFormula})`
                                    : 'Chưa tính (vào tab Tôi để lấy)'}
                            </Text>
                        </View>

                        <Text style={styles.totalText}>
                            Tổng hàng: {grandTotal.toLocaleString('vi-VN')} đ
                        </Text>
                    </View>
                }
            />

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
    listContent: {
        padding: 14,
    },
    cartCard: {
        backgroundColor: COLORS.surface,
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    itemSub: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 2,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    qtyBtn: {
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    qtyBtnText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    qtyText: {
        marginHorizontal: 10,
        fontSize: 13,
        fontWeight: '600',
    },
    delBtn: {
        backgroundColor: '#DC2626',
        width: 32,
        height: 32,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    delBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    summaryWrap: {
        marginTop: 10,
    },
    feeBox: {
        borderWidth: 1.5,
        borderColor: COLORS.secondary,
        borderRadius: 12,
        padding: 12,
        backgroundColor: COLORS.surface,
        marginBottom: 12,
    },
    feeLabel: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    feeValue: {
        color: COLORS.secondary,
        fontSize: 13,
        fontWeight: '700',
        marginTop: 2,
    },
    totalText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.primary,
        textAlign: 'center',
    },
    empty: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        color: COLORS.textLight,
    },
});