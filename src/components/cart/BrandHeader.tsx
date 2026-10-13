import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CartButton } from './CartButton';
import { colors } from '../../constants/theme';

export function BrandHeader({ back = false, hideCart = false }: { back?: boolean; hideCart?: boolean }) {
  return <><View style={styles.promo}><Text style={styles.promoText}>ENVÍO DE CORTESÍA EN COMPRAS MAYORES A $1,500</Text></View><View style={styles.header}>{back ? <Pressable accessibilityLabel="Volver" onPress={() => router.back()} style={styles.side}><Text style={styles.back}>←</Text></Pressable> : <Pressable accessibilityLabel="Volver al inicio" onPress={() => router.replace('/')} style={styles.home}><Text style={styles.homeText}>INICIO</Text></Pressable>}<Pressable accessibilityLabel="Ir al inicio" onPress={() => router.replace('/')}><Text style={styles.logo}>ÉLAN</Text></Pressable><View style={[styles.side, styles.right]}>{!hideCart && <CartButton />}</View></View></>;
}

const styles = StyleSheet.create({
  promo: { minHeight: 34, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, backgroundColor: colors.primary }, promoText: { color: '#fff', fontSize: 9, fontWeight: '600', letterSpacing: 1.4, textAlign: 'center' },
  header: { height: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.background },
  side: { width: 48 }, home: { width: 48, paddingVertical: 10 }, homeText: { color: colors.text, fontSize: 8, fontWeight: '700', letterSpacing: 1.2 }, right: { alignItems: 'flex-end' }, back: { color: colors.text, fontSize: 26 }, logo: { color: colors.text, fontSize: 25, fontWeight: '300', letterSpacing: 6 },
});
