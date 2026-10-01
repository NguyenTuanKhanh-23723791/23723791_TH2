import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '@constants/theme';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS, STALE_TIME_MS, VARIANT } from '@constants/student';
import { fetchProducts } from '@services/productApi';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS);

    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });

    const filtered = (data || []).filter((item) =>
        item.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor={COLORS.textLight}
                />
            </View>

            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.statusText}>Đang tải món...</Text>
                </View>
            ) : isError ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                    <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                    <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                        <Text style={styles.retryBtnText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <FlashList
                        data={filtered}
                        numColumns={2}
                        keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                        renderItem={({ item }) => (
                            <ProductCard
                                product={item}
                                onPress={() => navigation.navigate('Detail', { id: item.id.toString(), product: item })}
                            />
                        )}
                        onRefresh={refetch}
                        refreshing={isRefetching}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            )}

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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '900',
    },
    headerSub: {
        color: '#BFDBFE',
        fontSize: 13,
    },
    searchWrap: {
        padding: 10,
        backgroundColor: COLORS.background,
    },
    searchInput: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        color: COLORS.text,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 6,
    },
    listContent: {
        paddingBottom: 16,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    statusText: {
        marginTop: 10,
        color: COLORS.textLight,
    },
    errorMssv: {
        color: COLORS.error,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    errorText: {
        color: COLORS.text,
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
    retryBtn: {
        backgroundColor: COLORS.error,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});