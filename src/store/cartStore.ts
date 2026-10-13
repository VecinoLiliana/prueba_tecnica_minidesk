import { create } from 'zustand';
import type { CartItem, Product } from '../types/product';

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.product.id === product.id);
    return { items: existing
      ? state.items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...state.items, { product, quantity: 1 }] };
  }),
  removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: quantity <= 0
      ? state.items.filter((item) => item.product.id !== productId)
      : state.items.map((item) => item.product.id === productId ? { ...item, quantity } : item),
  })),
  clearCart: () => set({ items: [] }),
}));
