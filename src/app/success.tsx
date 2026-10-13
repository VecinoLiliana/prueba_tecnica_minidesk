import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useCheckoutStore } from '../store/checkoutStore';

const image = 'https://images.unsplash.com/photo-1614178113230-87b333095202?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200';

export default function SuccessScreen() {
  const order = useCheckoutStore((state) => state.completedOrder); const resetCheckout = useCheckoutStore((state) => state.resetCheckout);
  if (!order) return <Redirect href="/products" />;
  const goToStore = () => { resetCheckout(); router.dismissAll(); router.replace('/products'); };
  return <ImageBackground source={{ uri: image }} style={styles.background} imageStyle={styles.image}><View style={styles.overlay} /><View style={styles.content}><Text style={styles.logo}>ÉLAN</Text><View style={styles.main}><View style={styles.check}><Text style={styles.checkText}>✓</Text></View><Text style={styles.order}>PEDIDO {order.orderNumber}</Text><Text style={styles.title}>Gracias por{`\n`}elegirnos.</Text><Text style={styles.message}>Tu pago se completó con éxito. Tu pedido de {order.itemCount} artículos está confirmado y pronto recibirás los detalles de envío.</Text><Pressable onPress={goToStore} style={styles.link}><Text style={styles.linkText}>VOLVER A LA TIENDA</Text><Text style={styles.arrow}>→</Text></Pressable></View><Text style={styles.footer}>ATENCIÓN PERSONAL · HOLA@ELAN.MX</Text></View></ImageBackground>;
}

const styles = StyleSheet.create({
  background: { flex: 1 }, image: { opacity: 0.62 }, overlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(28,25,23,0.70)' }, content: { flex: 1, justifyContent: 'space-between', padding: 26, paddingTop: 58, paddingBottom: 32 }, logo: { color: '#fff', fontSize: 24, fontWeight: '300', letterSpacing: 6 }, main: { maxWidth: 520 }, check: { width: 66, height: 66, marginBottom: 30, borderRadius: 33, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)' }, checkText: { color: '#fff', fontSize: 28 }, order: { marginBottom: 14, color: 'rgba(255,255,255,0.62)', fontSize: 9, fontWeight: '700', letterSpacing: 2.2 }, title: { color: '#fff', fontSize: 53, lineHeight: 50, fontWeight: '300', letterSpacing: -2 }, message: { maxWidth: 360, marginTop: 24, color: 'rgba(255,255,255,0.68)', fontSize: 14, lineHeight: 23 }, link: { alignSelf: 'flex-start', flexDirection: 'row', gap: 20, marginTop: 30, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#fff' }, linkText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }, arrow: { color: '#fff', fontSize: 17 }, footer: { color: 'rgba(255,255,255,0.42)', fontSize: 8, letterSpacing: 1.2 },
});
