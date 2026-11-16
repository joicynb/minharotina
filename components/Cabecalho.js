import { StyleSheet, Text, View } from 'react-native';

// Recebe o texto do resumo por props e mostra o cabeçalho da lista.
export default function Cabecalho({ resumo }) {
  return (
    <View style={styles.cabecalho}>
      <Text style={styles.marca}>MINHA ROTINA</Text>
      <Text style={styles.resumo}>{resumo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: '#153C50',
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
  },
  marca: {
    color: '#A3E6DA',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  resumo: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 8,
  },
});