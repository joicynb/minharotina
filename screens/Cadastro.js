import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import Botao from '../components/Botao';

export default function Cadastro({ navigation, aoCadastrar }) {
  const [titulo, setTitulo] = useState('');
  const [erro, setErro] = useState('');

  const salvar = () => {
    // Remove os espaços das pontas antes de validar o título.
    const tituloLimpo = titulo.trim();

    if (tituloLimpo === '') {
      setErro('Digite o título da tarefa.');
      return;
    }

    aoCadastrar(tituloLimpo);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.fundo}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formulario}>
        <Text style={styles.rotulo}>Título da tarefa</Text>

        <TextInput
          style={styles.campo}
          accessibilityLabel="Título da tarefa"
          placeholder="Ex.: Revisar o README"
          value={titulo}
          maxLength={100}
          onChangeText={(texto) => {
            setTitulo(texto);
            setErro('');
          }}
        />

        {erro !== '' && (
          <Text style={styles.erro} accessibilityRole="alert">
            {erro}
          </Text>
        )}

        <Botao titulo="Salvar tarefa" aoPressionar={salvar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  conteudo: {
    padding: 20,
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
  },
  rotulo: {
    color: '#153247',
    fontWeight: '700',
    marginBottom: 8,
  },
  campo: {
    color: '#153247',
    borderWidth: 1,
    borderColor: '#B9CAD5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  erro: {
    color: '#B42318',
    marginBottom: 12,
  },
});