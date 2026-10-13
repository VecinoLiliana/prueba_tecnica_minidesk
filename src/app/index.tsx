import { router } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';

const hero = 'https://images.unsplash.com/photo-1779406165962-7df12de281b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600';

export default function WelcomeScreen() {
  return <ImageBackground source={{ uri: hero }} style={styles.background} imageStyle={styles.image}><View style={styles.overlay} /><View style={styles.brand}><Text style={styles.logo}>ÉLAN</Text></View><View style={styles.content}><Text style={styles.eyebrow}>EDICIÓN 01 — PRIMAVERA</Text><Text style={styles.title}>Lo esencial,{`\n`}reimaginado.</Text><Text style={styles.subtitle}>Una selección curada de diseño, textura y tecnología para todos los días.</Text><View style={styles.action}><Button onPress={() => router.push('/products')}>Explorar colección  →</Button></View></View></ImageBackground>;
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'space-between' }, image: { opacity: 0.94 }, overlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.38)' },
  brand: { alignItems: 'center', paddingTop: 74 }, logo: { color: '#fff', fontSize: 27, fontWeight: '300', letterSpacing: 7 }, content: { padding: 26, paddingBottom: 52 },
  eyebrow: { marginBottom: 18, color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 2.5 }, title: { color: '#fff', fontSize: 55, lineHeight: 54, fontWeight: '300', letterSpacing: -2 },
  subtitle: { maxWidth: 340, marginTop: 22, color: 'rgba(255,255,255,0.86)', fontSize: 14, lineHeight: 23 }, action: { width: '100%', maxWidth: 360, marginTop: 28 },
});
