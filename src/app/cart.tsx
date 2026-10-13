import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BrandHeader } from '../components/cart/BrandHeader';
import { CartItemRow } from '../components/cart/CartItemRow';
import { Button } from '../components/ui/Button';
import { colors } from '../constants/theme';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';

export default function CartScreen() {
  const { items, itemCount, total } = useCart();
  if (items.length === 0) return <View style={styles.flex}><BrandHeader back hideCart /><View style={styles.empty}><View style={styles.emptyIcon}><Text style={styles.emptyIconText}>⌑</Text></View><Text style={styles.emptyTitle}>Tu bolsa está vacía</Text><Text style={styles.muted}>Descubre nuestra selección y encuentra esa pieza que faltaba.</Text><Button onPress={() => router.replace('/products')}>Explorar colección</Button></View></View>;
  return <View style={styles.flex}><BrandHeader back hideCart /><FlatList data={items} keyExtractor={(item) => String(item.product.id)} renderItem={({ item }) => <CartItemRow item={item} />} ListHeaderComponent={<View style={styles.headingBlock}><Text style={styles.eyebrow}>TU SELECCIÓN</Text><View style={styles.titleRow}><Text style={styles.title}>Carrito</Text><Text style={styles.count}>{itemCount} artículos</Text></View></View>} contentContainerStyle={styles.list} /><View style={styles.summary}><Text style={styles.summaryTitle}>Resumen</Text><View style={styles.line}><Text style={styles.mutedSmall}>Subtotal</Text><Text>{formatCurrency(total)}</Text></View><View style={styles.line}><Text style={styles.mutedSmall}>Envío estándar</Text><Text style={styles.courtesy}>Cortesía</Text></View><View style={styles.totalLine}><Text style={styles.totalLabel}>Total</Text><Text style={styles.total}>{formatCurrency(total)}</Text></View><Button onPress={() => router.push('/checkout')}>Continuar al pago  →</Button><Text style={styles.safe}>PAGO SEGURO SIMULADO · SIN CARGOS REALES</Text></View></View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, list: { paddingHorizontal: 18, paddingBottom: 24 }, headingBlock: { paddingTop: 38, paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: colors.border }, eyebrow: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 2 }, titleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 8 }, title: { color: colors.text, fontSize: 40, fontWeight: '300' }, count: { color: colors.muted, fontSize: 11 },
  summary: { gap: 14, padding: 22, backgroundColor: colors.summarySurface }, summaryTitle: { marginBottom: 8, color: colors.text, fontSize: 25, fontWeight: '300' }, line: { flexDirection: 'row', justifyContent: 'space-between' }, mutedSmall: { color: colors.muted, fontSize: 12 }, courtesy: { color: '#7A6B43', fontSize: 12, fontWeight: '700' }, totalLine: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.border }, totalLabel: { fontWeight: '700' }, total: { fontWeight: '700' }, safe: { color: colors.muted, fontSize: 8, letterSpacing: 1, textAlign: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18, padding: 30 }, emptyIcon: { width: 65, height: 65, borderRadius: 33, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border }, emptyIconText: { fontSize: 30, transform: [{ rotate: '180deg' }] }, emptyTitle: { color: colors.text, fontSize: 36, fontWeight: '300', textAlign: 'center' }, muted: { maxWidth: 330, color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: 'center' },
});
