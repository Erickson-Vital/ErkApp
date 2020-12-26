import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Menu, { MenuItem } from 'react-native-material-menu';
import { StyleSheet, Text, View, FlatList, TextInput, Button, TouchableHighlight } from 'react-native';
import Item from "./item";


const listName = "Minha Lista"

export default class App extends Component{
  state = {
    text: "",
    itens: [

    ]
  }
  constructor(props) {
    super(props)
    this.inserirItem = this.inserirItem.bind(this)
    this.carregarLista()
  }
  renderItem(obj) {
    const [menuRef, setMenuRef] = useState({});
    return (
      <Menu button={<View onTouchEnd={() => menuRef?.show()}><Text style={styles.cell}>{obj.item.desc}</Text></View>} >
        <MenuItem onPress={()=> {removeItemValue(obj.key)}} >Remover</MenuItem>
      </Menu>
    )
  }
   inserirItem = () => {
    let newItem = {
      key: this.state.itens.length.toString(),
      desc: this.state.text,
      done: false
    }
    let itens = this.state.itens;
    itens.push(newItem)
    this.setState(itens)
    AsyncStorage.setItem(
      listName,
      JSON.stringify(itens)
    )

    let text = ""
    this.setState({ text })

  }
  removeItemValue = (key) => {
    let itens = this.state.itens.filter(item=>item.key !== key.toString())
    this.setState((state, prop) => ({ ...state, itens }))
    AsyncStorage.setItem(
      listName,
      JSON.stringify(itens)
    )
}
  carregarLista = async () => {
    let lista = await AsyncStorage.getItem(listName);
    let itens = JSON.parse(lista)
    this.setState((state, prop) => ({ ...state, itens }))
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list} data={this.state.itens} 
         renderItem={( item ) => (
          <Item obj={item} removeItemValue={this.removeItemValue} />
        )}
        extraData={this.state} />
        <View style={styles.vie}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => { this.setState({ text }) }}
            onPress={this.inserirItem}
            value={this.state.text}
            placeholder="Adicionar Tarefa"
          />
          <Button onPress={this.inserirItem} title="INSERIR"/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  list: {
    marginTop: 10,
    color: '#fff'
  },
  cell: {
    paddingTop: 20,
    paddingBottom: 20,
    color: "#191919",
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  botao: {
    margin: 5,
  }
});