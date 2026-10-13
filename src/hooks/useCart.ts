import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { items, addItem, removeItem, updateQuantity, clearCart, itemCount, total };
};

export const useCartBadge = () => useCartStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0),
);

export const useProductQuantity = (productId: number) => useCartStore((state) =>
  state.items.find((item) => item.product.id === productId)?.quantity ?? 0,
);
