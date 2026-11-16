import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import Botao from '../components/Botao';
import confirmarExclusao from '../utils/confirmarExclusao';

export default function Detalhes({
  route,
  navigation,
  tarefas,
  aoSalvar,
  aoExcluir,
}) {
  // A tela recebe o id pelo React Navigation e encontra a tarefa certa.
  const { tarefaId } = route.params;
  const tarefa = tarefas.find((item) => item.id === tarefaId);

  // O formulário começa com os dados que já foram salvos.
  const [titulo, setTitulo] = useState(tarefa?.titulo ?? '');
  const [erro, setErro] = useState('');
  const [descricao, setDescricao] = useState(tarefa?.descricao ?? '');
  const [mostrarDescricao, setMostrarDescricao] = useState(
    tarefa?.mostrarDescricao ?? true
  );

  if (!tarefa) {
    return <Text style={styles.tela}>Tarefa não encontrada.</Text>;
  }

  const salvar = () => {
    const tituloLimpo = titulo.trim();

    if (tituloLimpo === '') {
      setErro('O título não pode ficar vazio.');
      return;
    }

    aoSalvar(tarefaId, tituloLimpo, descricao.trim(), mostrarDescricao);
    navigation.goBack();
  };

  const excluir = () => {
    confirmarExclusao(tarefa.titulo, () => {
      aoExcluir(tarefaId);
      navigation.goBack();
    });
  };

  return (
    <ScrollView
      style={styles.fundo}
      contentContainerStyle={styles.tela}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.rotulo}>Título da tarefa</Text>
      <TextInput
        style={[styles.campo, styles.campoTitulo]}
        accessibilityLabel="Título da tarefa"
        placeholder="Digite o título"
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

      <Text style={styles.rotulo}>Descrição da tarefa</Text>
      <TextInput
        style={[styles.campo, styles.campoDescricao]}
        accessibilityLabel="Descrição da tarefa"
        placeholder="Escreva os detalhes aqui..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
        maxLength={500}
      />

      <View style={styles.opcao}>
        <Text style={styles.rotuloOpcao}>Mostrar descrição no cartão</Text>
        <Switch
          accessibilityLabel="Mostrar descrição no cartão"
          value={mostrarDescricao}
          onValueChange={setMostrarDescricao}
        />
      </View>

      <View style={styles.botoes}>
        <Botao titulo="Salvar alterações" aoPressionar={salvar} />
        <Botao titulo="Excluir tarefa" perigo aoPressionar={excluir} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#F4F7FA' },
  tela: { padding: 20 },
  rotulo: { fontWeight: '700', color: '#153247', marginBottom: 8 },
  campo: {
    backgroundColor: '#FFFFFF',
    color: '#153247',
    borderWidth: 1,
    borderColor: '#B9CAD5',
    borderRadius: 10,
    padding: 12,
  },
  campoTitulo: { marginBottom: 12 },
  campoDescricao: { minHeight: 120, textAlignVertical: 'top' },
  erro: { color: '#B42318', marginBottom: 12 },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginVertical: 16,
  },
  rotuloOpcao: { flex: 1, color: '#153247' },
  botoes: { gap: 12 },
});