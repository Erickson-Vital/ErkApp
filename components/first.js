import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Home = ({navigation}) => {
  function navigate(){
      navigation.navigate('Users')
  }
  useEffect(()=> {
      async function A(){
          await delay(2000)
          navigate()
      }
      A()
  },[])
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Erk Tarefas</Text>
        <Text style={styles.text2}>Organizar tarefas diarais simples e facil.</Text>
        <Button
        title="Ir para lista"
        onPress={() => (navigate()) }
      />
      </View>
    )
  }

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupar todo espaço da tela
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  text2: {
    color: '#fff',
    fontSize: 17,
  }
});