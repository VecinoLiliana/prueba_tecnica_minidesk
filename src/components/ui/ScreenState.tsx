import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { Button } from './Button';

export function LoadingState({ label = 'Cargando…' }: { label?: string }) {
  return <View style={styles.container}><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.text}>{label}</Text></View>;
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return <View style={styles.container}><Text style={styles.title}>Algo salió mal</Text><Text style={styles.text}>{message}</Text>{onRetry && <Button onPress={onRetry}>Reintentar</Button>}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 240, gap: 16, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: colors.text, fontSize: 22, fontWeight: '700' },
  text: { color: colors.muted, fontSize: 16, textAlign: 'center' },
});
