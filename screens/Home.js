import { FlatList, StyleSheet, Text, View } from 'react-native';

import Botao from '../components/Botao';
import Cabecalho from '../components/Cabecalho';
import CardTarefa from '../components/CardTarefa';

export default function Home({ navigation, tarefas, aoAlternar, aoExcluir }) {
  const totalConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  return (
    <View style={styles.tela}>
      <FlatList
        data={tarefas}
        keyExtractor={(tarefa) => tarefa.id}
        ListHeaderComponent={
          <>
            <Cabecalho
              resumo={`${totalConcluidas} de ${tarefas.length} concluídas`}
            />

            <Botao
              titulo="+ Nova tarefa"
              aoPressionar={() => navigation.navigate('Cadastro')}
            />

            <Text style={styles.instrucao}>
              Toque no título para concluir ou reabrir.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <CardTarefa
            tarefa={item}
            aoAlternar={aoAlternar}
            aoExcluir={aoExcluir}
            // Envia o id para abrir a tarefa certa na tela de edição.
            aoAbrirDetalhes={(id) =>
              navigation.navigate('Detalhes', { tarefaId: id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.instrucao}>Nenhuma tarefa cadastrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    padding: 20,
  },
  instrucao: {
    color: '#506574',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 12,
  },
});