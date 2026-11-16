
# Minha Rotina

## Descrição
Aplicativo mobile de lista de tarefas feito com React Native e Expo. O usuário cadastra tarefas, marca como concluídas ou pendentes e abre os detalhes de cada uma para escrever uma descrição. As tarefas ficam salvas no aparelho e continuam lá quando o app é reaberto.

## Aluno
Joicy Nunes Barbosa - RGM: 041690346

## Telas
- **Home (Lista):** mostra o resumo de tarefas concluídas, a lista de tarefas e o botão "+ Nova tarefa". Tocar no título conclui ou reabre a tarefa, e o botão "Detalhes" abre a tela de detalhes.
- **Cadastro:** formulário com campo de título e validação. Se o título estiver vazio, mostra mensagem de erro; se estiver correto, adiciona a tarefa e volta para a lista.
- **Detalhes:** recebe o id da tarefa escolhida, mostra o título e permite escrever uma descrição e escolher se ela aparece no cartão da lista.

## Fonte de dados
Dados locais. A lista começa com um array de objetos (`tarefasIniciais`, em `App.js`) e passa a ser salva no aparelho com o AsyncStorage (`@react-native-async-storage/async-storage`). Não usa API.

## Onde estão os requisitos
- Componentes: `components/Botao.js`, `components/CardTarefa.js` e `components/Cabecalho.js` (o `Botao` é usado nas três telas e o `CardTarefa` é repetido em cada item da lista)
- Props com callback: `Botao` recebe `aoPressionar`; `CardTarefa` recebe `aoAlternar` e `aoAbrirDetalhes` (funções enviadas pela tela Home)
- useState:
  - `App.js`: lista de tarefas (`tarefas`) e controle de carregamento (`carregando`)
  - `screens/Cadastro.js`: campo controlado `titulo` e mensagem de `erro`
  - `screens/Detalhes.js`: campo controlado `descricao` e opção `mostrarDescricao`
- useEffect: `App.js`
  - um efeito com `[]` carrega as tarefas do AsyncStorage ao abrir o app, com função de limpeza (cleanup)
  - outro efeito com `[tarefas, carregando]` salva a lista a cada mudança
- Navegação com parâmetros: `screens/Home.js` chama `navigation.navigate('Detalhes', { tarefaId: id })` e `screens/Detalhes.js` lê o valor em `route.params.tarefaId`

## Vídeo de demonstração
demo/demo.mp4

## Como executar
```
npm install
npx expo start
```
