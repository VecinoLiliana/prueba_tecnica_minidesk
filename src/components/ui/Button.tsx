import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/theme';

type Props = PropsWithChildren<{ onPress: () => void; disabled?: boolean; loading?: boolean; variant?: 'primary' | 'danger' }>;

export function Button({ children, onPress, disabled, loading, variant = 'primary' }: Props) {
  return <Pressable accessibilityRole="button" disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.button, variant === 'danger' && styles.danger, (disabled || loading) && styles.disabled, pressed && styles.pressed]}>{loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{children}</Text>}</Pressable>;
}

const styles = StyleSheet.create({
  button: { minHeight: 52, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24, backgroundColor: colors.primary },
  danger: { backgroundColor: colors.error }, disabled: { opacity: 0.45 }, pressed: { opacity: 0.82 },
  text: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' },
});
