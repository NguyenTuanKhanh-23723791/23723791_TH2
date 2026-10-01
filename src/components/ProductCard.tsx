import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { hapticImpact, hapticSelection } from '@utils/haptics';
import { Product } from '@services/productApi';
import { COLORS } from '@constants/theme';
import { PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

interface Props {
    product: Product;
    onPress: () => void;
}

export const ProductCard: React.FC<Props> = ({ product, onPress }) => {
    const addItem = useCartStore((s: any) => s.addItem);
    const formattedPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAdd = () => {
        addItem(product);
        try {
            if (VARIANT.hapticOnAdd === 'impact') {
                hapticImpact();
            } else {
                hapticSelection();
            }
        } catch (e) { }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            </View>
            <Text style={styles.title} numberOfLines={1}>
                {product.title}
            </Text>
            <View style={styles.row}>
                <Text style={styles.price}>{formattedPrice}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                    <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 10,
        margin: 6,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        height: 100,
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    image: {
        width: 80,
        height: 80,
    },
    title: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    price: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    addBtn: {
        backgroundColor: COLORS.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: -2,
    },
});