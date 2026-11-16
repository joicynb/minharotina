import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import confirmarExclusao from '../utils/confirmarExclusao';

export default function CardTarefa({
  tarefa,
  aoAlternar,
  aoAbrirDetalhes,
  aoExcluir,
}) {
  const { id, titulo, concluida, descricao, mostrarDescricao } = tarefa;

  return (
    <View style={styles.cartao}>
      <View style={styles.linha}>
        {/* Tocar no título ou na etiqueta muda o status da tarefa. */}
        <Pressable
          style={styles.areaTarefa}
          accessibilityRole="checkbox"
          accessibilityLabel={titulo}
          accessibilityState={{ checked: concluida }}
          onPress={() => aoAlternar(id)}
        >
          <Text style={[styles.titulo, concluida && styles.riscado]}>
            {titulo}
          </Text>

          <Text
            style={[
              styles.status,
              concluida ? styles.feita : styles.pendente,
            ]}
          >
            {concluida ? 'Concluída' : 'Pendente'}
          </Text>
        </Pressable>

        <View style={styles.acoes}>
          {/* Ícone de lápis: abre a tela para editar e salvar a tarefa. */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Editar ${titulo}`}
            onPress={() => aoAbrirDetalhes(id)}
            style={({ pressed }) => [
              styles.botaoIcone,
              styles.botaoEditar,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons name="create-outline" size={22} color="#00685F" />
          </Pressable>

          {/* Ícone de lixeira: exclui a tarefa depois de confirmar. */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Excluir ${titulo}`}
            onPress={() => confirmarExclusao(titulo, () => aoExcluir(id))}
            style={({ pressed }) => [
              styles.botaoIcone,
              styles.botaoExcluir,
              pressed && styles.pressionado,
            ]}
          >
            <Ionicons name="trash-outline" size={22} color="#B42318" />
          </Pressable>
        </View>
      </View>

      {/* A descrição aparece abaixo quando a opção estiver ativada. */}
      {!!descricao && mostrarDescricao && (
        <Text style={styles.descricao}>{descricao}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E8EE',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  areaTarefa: {
    flex: 1,
  },
  titulo: {
    color: '#153247',
    fontSize: 16,
    fontWeight: '700',
  },
  riscado: {
    textDecorationLine: 'line-through',
  },
  status: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  feita: {
    backgroundColor: '#DFF3EB',
    color: '#22664F',
  },
  pendente: {
    backgroundColor: '#FFF2D5',
    color: '#785414',
  },
  acoes: {
    flexDirection: 'row',
    gap: 8,
  },
  botaoIcone: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEditar: {
    backgroundColor: '#E2F3F0',
  },
  botaoExcluir: {
    backgroundColor: '#FDECEA',
  },
  pressionado: {
    opacity: 0.7,
  },
  descricao: {
    color: '#506574',
    lineHeight: 20,
    marginTop: 10,
  },
});