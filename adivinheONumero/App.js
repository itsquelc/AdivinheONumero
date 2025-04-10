import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const App = () => {
  // Gerar número aleatório entre 1 e 100
  const numeroSecreto = Math.floor(Math.random() * 100) + 1;

  // Estados
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  // Função para verificar o palpite
  const verificarPalpite = () => {
    const numeroPalpite = parseInt(palpite);

    // Verificar se o número está fora do intervalo de 1 a 100
    if (numeroPalpite < 1 || numeroPalpite > 100) {
      setMensagem('Por favor, digite um número válido entre 1 e 100.');
      return;
    }

    if (isNaN(numeroPalpite)) {
      Alert.alert('Erro', 'Digite um número válido entre 1 e 100.');
      return;
    }

    if (tentativas >= 4) {
      // Caso já tenha feito 5 tentativas, mostra o número secreto
      setMensagem(`Fim de jogo! O número secreto era ${numeroSecreto}.`);
      setJogoFinalizado(true);
      return;
    }

    if (numeroPalpite === numeroSecreto) {
      setMensagem('Você acertou!');
      setJogoFinalizado(true);
    } else if (numeroPalpite < numeroSecreto) {
      setMensagem('Errou! O número é maior.');
    } else {
      setMensagem('Errou! O número é menor.');
    }

    setTentativas(tentativas + 1);
  };

  // Função para reiniciar o jogo
  const reiniciarJogo = () => {
    setPalpite('');
    setMensagem('');
    setTentativas(0);
    setJogoFinalizado(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.caixaTitulo}>
        <Text style={styles.titulo}>Qual o número de 1 a 100?</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite seu palpite"
        keyboardType="numeric"
        value={palpite}
        onChangeText={setPalpite}
        editable={!jogoFinalizado} // Impede alterações após o jogo terminar
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={verificarPalpite}
        disabled={jogoFinalizado || tentativas >= 5} // Desabilita o botão após 5 tentativas
      >
        <Text style={styles.botaoTexto}>Verificar</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>

      {jogoFinalizado && (
        <TouchableOpacity style={styles.botao} onPress={reiniciarJogo}>
          <Text style={styles.botaoTexto}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      )}

      {!jogoFinalizado && <Text style={styles.tentativas}>Tentativas: {tentativas} / 5</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8eef8',
  },
  caixaTitulo: {
    backgroundColor: '#600061', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10,    
    marginBottom: 20,   
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',  // Cor do texto dentro da caixa
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#6d84c3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 18,
  },
  mensagem: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tentativas: {
    fontSize: 16,
    color: '#555',
  },
});

export default App;
