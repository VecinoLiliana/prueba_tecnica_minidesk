import { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../constants/theme';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { QuantityControls } from './QuantityControls';

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  return <View style={styles.card}><Pressable accessibilityRole="link" onPress={() => router.push(`/products/${product.id}`)}><View style={styles.imageFrame}><Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" /><View style={styles.tag}><Text style={styles.tagText}>SELECCIÓN</Text></View></View></Pressable><View style={styles.info}><Pressable onPress={() => router.push(`/products/${product.id}`)} style={styles.copy}><Text numberOfLines={2} style={styles.title}>{product.title}</Text><Text style={styles.price}>{formatCurrency(product.price)}</Text></Pressable><QuantityControls compact product={product} /></View></View>;
});

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0 }, imageFrame: { aspectRatio: 0.75, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.productSurface }, image: { width: '100%', height: '100%' },
  tag: { position: 'absolute', top: 10, left: 10, paddingHorizontal: 7, paddingVertical: 5, backgroundColor: 'rgba(255,255,255,0.92)' }, tagText: { color: colors.text, fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  info: { minHeight: 86, flexDirection: 'column', alignItems: 'flex-start', gap: 10, paddingTop: 12 }, copy: { flex: 1 }, title: { color: colors.text, fontSize: 12, lineHeight: 18 }, price: { marginTop: 4, color: colors.text, fontSize: 12, fontWeight: '700' },
});
