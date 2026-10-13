import { useMemo, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { BrandHeader } from '../../components/cart/BrandHeader';
import { ProductCard } from '../../components/product/ProductCard';
import { ErrorState, LoadingState } from '../../components/ui/ScreenState';
import { colors } from '../../constants/theme';
import { useProducts } from '../../hooks/useProducts';

const hero = 'https://images.unsplash.com/photo-1779406165962-7df12de281b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600';
const categories = [{ value: 'all', label: 'Todo' }, { value: "women's clothing", label: 'Mujer' }, { value: "men's clothing", label: 'Hombre' }, { value: 'jewelery', label: 'Joyas' }, { value: 'electronics', label: 'Electrónicos' }];

export default function ProductsScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useProducts();
  const [search, setSearch] = useState(''); const [category, setCategory] = useState('all');
  const { width } = useWindowDimensions(); const columns = width >= 900 ? 4 : width >= 620 ? 3 : 2;
  const products = useMemo(() => data?.filter((product) => (category === 'all' || product.category === category) && `${product.title} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase())) ?? [], [category, data, search]);
  const header = <><ImageBackground source={{ uri: hero }} style={styles.hero}><View style={styles.overlay} /><View style={styles.heroCopy}><Text style={styles.eyebrow}>EDICIÓN 01 — PRIMAVERA</Text><Text style={styles.heroTitle}>Lo esencial,{`\n`}reimaginado.</Text><Text style={styles.heroText}>Una selección curada de diseño, textura y tecnología para todos los días.</Text></View></ImageBackground><View style={styles.catalogHead}><Text style={styles.eyebrowDark}>CURADURÍA ÉLAN</Text><Text style={styles.heading}>La colección</Text><TextInput accessibilityLabel="Buscar productos" placeholder="Buscar en la colección" placeholderTextColor={colors.muted} value={search} onChangeText={setSearch} style={styles.search} /><FlatList horizontal showsHorizontalScrollIndicator={false} data={categories} keyExtractor={(item) => item.value} contentContainerStyle={styles.categories} renderItem={({ item }) => <Pressable onPress={() => setCategory(item.value)} style={[styles.category, category === item.value && styles.categoryActive]}><Text style={[styles.categoryText, category === item.value && styles.categoryTextActive]}>{item.label.toUpperCase()}</Text></Pressable>} /></View></>;
  if (isLoading) return <View style={styles.flex}><BrandHeader /><LoadingState label="Cargando colección…" /></View>;
  if (error) return <View style={styles.flex}><BrandHeader /><ErrorState message={error.message} onRetry={() => refetch()} /></View>;
  return <View style={styles.flex}><BrandHeader /><FlatList key={columns} data={products} numColumns={columns} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => <ProductCard product={item} />} ListHeaderComponent={header} ListEmptyComponent={<View style={styles.empty}><Text style={styles.heading}>Sin coincidencias</Text><Text style={styles.muted}>Prueba con otra categoría o búsqueda.</Text></View>} ListFooterComponent={<Text style={styles.footer}>ÉLAN MÉXICO · SELECCIÓN CONSCIENTE · 2026</Text>} contentContainerStyle={styles.list} columnWrapperStyle={styles.row} refreshing={isRefetching} onRefresh={refetch} /></View>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, list: { paddingBottom: 0, backgroundColor: colors.background }, row: { gap: 12, paddingHorizontal: 14, marginBottom: 26 }, hero: { minHeight: 460, justifyContent: 'flex-end' }, overlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)' }, heroCopy: { padding: 24, paddingBottom: 42 },
  eyebrow: { marginBottom: 15, color: '#fff', fontSize: 9, fontWeight: '700', letterSpacing: 2.5 }, heroTitle: { color: '#fff', fontSize: 50, lineHeight: 48, fontWeight: '300', letterSpacing: -2 }, heroText: { maxWidth: 330, marginTop: 20, color: 'rgba(255,255,255,0.86)', fontSize: 13, lineHeight: 21 },
  catalogHead: { paddingTop: 44, paddingHorizontal: 16, marginBottom: 24 }, eyebrowDark: { color: colors.muted, fontSize: 9, fontWeight: '700', letterSpacing: 2 }, heading: { marginTop: 7, color: colors.text, fontSize: 38, fontWeight: '300', letterSpacing: -1 },
  search: { height: 48, marginTop: 25, borderBottomWidth: 1, borderBottomColor: colors.text, color: colors.text, fontSize: 14 }, categories: { gap: 24, paddingTop: 22 }, category: { paddingBottom: 7 }, categoryActive: { borderBottomWidth: 1, borderBottomColor: colors.text }, categoryText: { color: colors.muted, fontSize: 10, letterSpacing: 1 }, categoryTextActive: { color: colors.text, fontWeight: '700' },
  empty: { alignItems: 'center', gap: 10, paddingVertical: 70 }, muted: { color: colors.muted }, footer: { marginTop: 25, paddingVertical: 35, borderTopWidth: 1, borderTopColor: colors.border, color: colors.muted, fontSize: 9, letterSpacing: 1.4, textAlign: 'center' },
});
