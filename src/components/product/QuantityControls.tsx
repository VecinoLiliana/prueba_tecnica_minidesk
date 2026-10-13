import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import type { Product } from '../../types/product';
import { useCartStore } from '../../store/cartStore';
import { useProductQuantity } from '../../hooks/useCart';

export function QuantityControls({ product, compact = false }: { product: Product; compact?: boolean }) {
  const quantity = useProductQuantity(product.id);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  return <View style={[styles.container, compact && styles.compact]}><Pressable accessibilityLabel={`Quitar una unidad de ${product.title}`} onPress={() => updateQuantity(product.id, quantity - 1)} disabled={quantity === 0} style={styles.control}><Text style={[styles.symbol, quantity === 0 && styles.disabled]}>−</Text></Pressable><Text accessibilityLabel={`${quantity} unidades`} style={styles.quantity}>{quantity}</Text><Pressable accessibilityLabel={`Agregar una unidad de ${product.title}`} onPress={() => addItem(product)} style={styles.control}><Text style={styles.symbol}>+</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  container: { height: 46, minWidth: 132, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: colors.border, backgroundColor: colors.background },
  compact: { height: 34, minWidth: 94 }, control: { height: '100%', minWidth: 34, alignItems: 'center', justifyContent: 'center' },
  symbol: { color: colors.text, fontSize: 20, fontWeight: '400' }, disabled: { color: colors.border }, quantity: { minWidth: 20, color: colors.text, textAlign: 'center', fontSize: 13, fontWeight: '600' },
});
