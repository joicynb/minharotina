import { Alert, Platform } from 'react-native';

// Pergunta se o usuário quer mesmo excluir e só chama aoConfirmar se ele disser sim.
// No celular usa o Alert do React Native. Na web (Snack Web / navegador) o Alert com
// botões não funciona, então usa o window.confirm.
export default function confirmarExclusao(titulo, aoConfirmar) {
  const mensagem = `Deseja excluir "${titulo}"?`;

  if (Platform.OS === 'web') {
    if (window.confirm(mensagem)) {
      aoConfirmar();
    }
    return;
  }

  Alert.alert('Excluir tarefa', mensagem, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: aoConfirmar },
  ]);
}