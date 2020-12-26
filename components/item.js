import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Menu, { MenuItem } from 'react-native-material-menu';

const Item = ({obj,removeItemValue}) => {
        const [menuRef, setMenuRef] = useState({});
        return (
          <Menu ref={(ref) => { setMenuRef(ref) }} button={<View onTouchEnd={() => menuRef?.show()}><Text style={styles.cell}>{obj.item.desc}</Text></View>} >
            <MenuItem onPress={()=> {removeItemValue(obj.item.key)}} >Remover</MenuItem>
          </Menu>
        )
      }

export default Item;

const styles = StyleSheet.create({
    cell: {
        paddingTop: 20,
        paddingBottom: 20,
        color: "#191919",
        fontSize: 18,
      },
})