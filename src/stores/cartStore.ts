import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';
import { Product } from '@services/productApi';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    shippingFee: number | null;
    addItem: (product: Product) => void;
    removeItem: (id: number) => void;
    changeQty: (id: number, delta: number) => void;
    setShippingFee: (fee: number) => void;
    clearCart: () => void;
    totalQuantity: () => number;
    totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            shippingFee: null,
            addItem: (product) => {
                const { items } = get();
                const existing = items.find((i) => i.product.id === product.id);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { product, quantity: 1 }] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.product.id !== id) });
            },
            changeQty: (id, delta) => {
                const { items } = get();
                set({
                    items: items
                        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
                        .filter((i) => i.quantity > 0),
                });
            },
            setShippingFee: (fee) => set({ shippingFee: fee }),
            clearCart: () => set({ items: [] }),
            totalQuantity: () => {
                return get().items.reduce((sum, i) => sum + i.quantity, 0);
            },
            totalAmount: () => {
                return get().items.reduce(
                    (sum, i) => sum + Math.round(i.product.price * PRICE_MULTIPLIER) * i.quantity,
                    0
                );
            },
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);