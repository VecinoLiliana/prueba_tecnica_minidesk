import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../constants/theme';
import type { CartItem } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { QuantityControls } from '../product/QuantityControls';
import { useCartStore } from '../../store/cartStore';

export function CartItemRow({ item }: { item: CartItem }) {
  const removeItem = useCartStore((state) => state.removeItem);
  return <View style={styles.card}><Pressable onPress={() => router.push(`/products/${item.product.id}`)} style={styles.imageFrame}><Image source={{ uri: item.product.image }} style={styles.image} resizeMode="contain" /></Pressable><View style={styles.content}><Text style={styles.category}>{item.product.category.toUpperCase()}</Text><Text numberOfLines={2} style={styles.title}>{item.product.title}</Text><Text style={styles.price}>{formatCurrency(item.product.price)}</Text><Text style={styles.subtotal}>Subtotal: {formatCurrency(item.product.price * item.quantity)}</Text><View style={styles.actions}><QuantityControls compact product={item.product} /><Pressable onPress={() => removeItem(item.product.id)}><Text style={styles.remove}>ELIMINAR</Text></Pressable></View></View></View>;
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 15, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.border }, imageFrame: { width: 106, aspectRatio: 0.75, padding: 14, backgroundColor: colors.productSurface }, image: { width: '100%', height: '100%' },
  content: { flex: 1 }, category: { color: colors.muted, fontSize: 8, letterSpacing: 1.1 }, title: { marginTop: 7, color: colors.text, fontSize: 14, lineHeight: 20 }, price: { marginTop: 8, color: colors.text, fontSize: 12, fontWeight: '700' }, subtotal: { marginTop: 5, color: colors.muted, fontSize: 10 }, actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }, remove: { color: colors.muted, fontSize: 9, fontWeight: '600', letterSpacing: 1 },
});
