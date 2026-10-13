import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { BrandHeader } from '../../components/cart/BrandHeader';
import { QuantityControls } from '../../components/product/QuantityControls';
import { Button } from '../../components/ui/Button';
import { ErrorState, LoadingState } from '../../components/ui/ScreenState';
import { colors } from '../../constants/theme';
import { useProductQuantity } from '../../hooks/useCart';
import { useProductDetail } from '../../hooks/useProducts';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../utils/currency';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>(); const rawId = Array.isArray(id) ? id[0] : id; const parsedId = Number(rawId); const validId = Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
  const { data, isLoading, error, refetch } = useProductDetail(validId); const quantity = useProductQuantity(validId ?? 0); const addItem = useCartStore((state) => state.addItem);
  if (!validId) return <View style={styles.flex}><BrandHeader back /><ErrorState message="El identificador del producto no es válido." /></View>;
  if (isLoading) return <View style={styles.flex}><BrandHeader back /><LoadingState label="Cargando producto…" /></View>;
  if (error || !data) return <View style={styles.flex}><BrandHeader back /><ErrorState message={error?.message ?? 'Producto no encontrado.'} onRetry={() => refetch()} /></View>;
  return <View style={styles.flex}><BrandHeader back /><ScrollView contentContainerStyle={styles.container}><View style={styles.imageFrame}><Image source={{ uri: data.image }} style={styles.image} resizeMode="contain" /></View><View style={styles.info}><Text style={styles.category}>{data.category.toUpperCase()}</Text><Text style={styles.title}>{data.title}</Text><Text style={styles.price}>{formatCurrency(data.price)}</Text><Text style={styles.rating}>★ {data.rating.rate.toFixed(1)}  ·  <Text style={styles.muted}>{data.rating.count} reseñas</Text></Text><Text style={styles.description}>{data.description}</Text><View style={styles.purchase}><QuantityControls product={data} /><View style={styles.button}><Button onPress={() => quantity ? router.push('/cart') : addItem(data)}>{quantity ? 'Ver en carrito  →' : 'Agregar al carrito  →'}</Button></View></View><View style={styles.service}><View><Text style={styles.serviceTitle}>ENTREGA</Text><Text style={styles.serviceText}>3–5 días hábiles</Text></View><View><Text style={styles.serviceTitle}>DEVOLUCIONES</Text><Text style={styles.serviceText}>Sin costo, 30 días</Text></View></View></View></ScrollView></View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, container: { paddingBottom: 44 }, imageFrame: { minHeight: 430, alignItems: 'center', justifyContent: 'center', padding: 50, backgroundColor: colors.productSurface }, image: { width: '100%', height: 330 }, info: { padding: 24 },
  category: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 2 }, title: { marginTop: 14, color: colors.text, fontSize: 35, lineHeight: 42, fontWeight: '300', letterSpacing: -1 }, price: { marginTop: 18, color: colors.text, fontSize: 18, fontWeight: '600' }, rating: { marginTop: 16, color: colors.text, fontSize: 12 }, muted: { color: colors.muted },
  description: { marginTop: 27, paddingTop: 24, borderTopWidth: 1, borderTopColor: colors.border, color: colors.muted, fontSize: 14, lineHeight: 25 }, purchase: { gap: 12, marginTop: 28 }, button: { flex: 1 }, service: { flexDirection: 'row', gap: 50, marginTop: 30, paddingTop: 24, borderTopWidth: 1, borderTopColor: colors.border }, serviceTitle: { color: colors.text, fontSize: 9, fontWeight: '700', letterSpacing: 1 }, serviceText: { marginTop: 5, color: colors.muted, fontSize: 11 },
});
