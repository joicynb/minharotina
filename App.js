import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Cadastro from './screens/Cadastro';
import Detalhes from './screens/Detalhes';

const Stack = createNativeStackNavigator();

const CHAVE_TAREFAS = '@minharotina:tarefas';

const tarefasIniciais = [
  { id: '1', titulo: 'Estudar React Native', concluida: false },
  { id: '2', titulo: 'Revisar o trabalho da faculdade', concluida: false },
  { id: '3', titulo: 'Organizar minha semana', concluida: true },
];

export default function App() {
  // As três telas trabalham com a mesma lista, guardada aqui no App.
  const [tarefas, setTarefas] = useState(tarefasIniciais);
  const [carregando, setCarregando] = useState(true);
  const proximoId = useRef(4);

  // Efeito 1: roda uma vez ao abrir o app e carrega as tarefas salvas.
  useEffect(() => {
    let ativo = true; // evita atualizar o estado se o app for fechado antes

    async function carregarTarefas() {
      try {
        const texto = await AsyncStorage.getItem(CHAVE_TAREFAS);

        if (texto !== null && ativo) {
          const salvas = JSON.parse(texto);
          setTarefas(salvas);

          // Continua a numeração a partir do maior id já salvo.
          const maiorId = salvas.reduce(
            (maior, tarefa) => Math.max(maior, Number(tarefa.id)),
            0
          );
          proximoId.current = maiorId + 1;
        }
      } catch (e) {
        console.log('Erro ao carregar tarefas', e);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarTarefas();

    // Função de limpeza (cleanup).
    return () => {
      ativo = false;
    };
  }, []);

  // Efeito 2: roda toda vez que a lista muda e salva no aparelho.
  useEffect(() => {
    // Só salva depois do carregamento, para não apagar o que estava salvo.
    if (carregando) return;

    AsyncStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas)).catch((e) =>
      console.log('Erro ao salvar tarefas', e)
    );
  }, [tarefas, carregando]);

  const cadastrarTarefa = (titulo) => {
    const novaTarefa = {
      id: String(proximoId.current),
      titulo,
      concluida: false,
      descricao: '',
      mostrarDescricao: true,
    };

    proximoId.current += 1;
    setTarefas((listaAtual) => [novaTarefa, ...listaAtual]);
  };

  const alternarStatus = (id) => {
    // Copia a tarefa tocada e troca seu status.
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  };

  const salvarDetalhes = (id, titulo, descricao, mostrarDescricao) => {
    // Guarda o título, a descrição e a escolha de exibição na tarefa certa.
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, titulo, descricao, mostrarDescricao }
          : tarefa
      )
    );
  };

  const excluirTarefa = (id) => {
    // filter cria uma nova lista sem a tarefa excluída.
    setTarefas((listaAtual) => listaAtual.filter((tarefa) => tarefa.id !== id));
  };

  // Feedback de carregamento enquanto lê o armazenamento.
  if (carregando) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#008C82" />
        <Text style={styles.textoCarregando}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lista"
        screenOptions={{
          headerStyle: { backgroundColor: '#153C50' },
          headerTintColor: '#FFFFFF',
        }}
      >
        <Stack.Screen name="Lista" options={{ title: 'Minhas tarefas' }}>
          {({ navigation }) => (
            <Home
              navigation={navigation}
              tarefas={tarefas}
              aoAlternar={alternarStatus}
              aoExcluir={excluirTarefa}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cadastro" options={{ title: 'Nova tarefa' }}>
          {({ navigation }) => (
            <Cadastro navigation={navigation} aoCadastrar={cadastrarTarefa} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Detalhes" options={{ title: 'Detalhes da tarefa' }}>
          {({ route, navigation }) => (
            <Detalhes
              route={route}
              navigation={navigation}
              tarefas={tarefas}
              aoSalvar={salvarDetalhes}
              aoExcluir={excluirTarefa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F7FA',
  },
  textoCarregando: {
    color: '#506574',
    fontSize: 14,
    marginTop: 12,
  },
});