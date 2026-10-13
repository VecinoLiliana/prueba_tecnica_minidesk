import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../constants/theme';
import { useCartBadge } from '../../hooks/useCart';

function CartIcon() {
  return <View style={styles.cart}><View style={styles.handle} /><View style={styles.basket}><View style={styles.basketLine} /></View><View style={styles.wheels}><View style={styles.wheel} /><View style={styles.wheel} /></View></View>;
}

export function CartButton() {
  const count = useCartBadge();
  return <Pressable accessibilityLabel={`Carrito, ${count} artículos`} onPress={() => router.push('/cart')} style={styles.button}><CartIcon />{count > 0 && <View style={styles.badge}><Text style={styles.count}>{count > 99 ? '99+' : count}</Text></View>}</Pressable>;
}

const styles = StyleSheet.create({
  button: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  cart: { width: 25, height: 25, marginTop: 2 }, handle: { width: 7, height: 1.5, marginLeft: 1, marginBottom: 2, backgroundColor: colors.text },
  basket: { width: 20, height: 12, marginLeft: 4, justifyContent: 'center', borderWidth: 1.5, borderTopWidth: 1, borderColor: colors.text, transform: [{ skewX: '-8deg' }] }, basketLine: { height: 1, marginHorizontal: 3, backgroundColor: colors.border },
  wheels: { width: 17, flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginLeft: 6 }, wheel: { width: 3.5, height: 3.5, borderRadius: 2, backgroundColor: colors.text },
  badge: { position: 'absolute', right: 0, top: 0, minWidth: 19, height: 19, paddingHorizontal: 4, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary }, count: { color: '#fff', fontSize: 9, fontWeight: '800' },
});
