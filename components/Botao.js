import { Pressable, StyleSheet, Text } from 'react-native';

// As telas enviam o texto e a função que roda quando alguém toca no botão.
// Com perigo={true}, o botão fica vermelho (usado para excluir).
export default function Botao({ titulo, aoPressionar, perigo = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={aoPressionar}
      style={({ pressed }) => [
        styles.botao,
        perigo && styles.perigo,
        pressed && styles.pressionado,
      ]}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#008C82',
    borderRadius: 15,
    padding: 16,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perigo: {
    backgroundColor: '#B42318',
  },
  pressionado: {
    opacity: 0.75,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});