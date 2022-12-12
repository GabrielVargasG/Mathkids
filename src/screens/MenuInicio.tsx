import React, { useContext,useState,useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { InicioScreen } from './InicioScreen';
import { Configuracion } from './Configuracion';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, View, Text, useColorScheme, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContex';
import { AppDark, theme } from '../../App';
import { DrawerActions } from '@react-navigation/native';
import { NivelContext } from '../context/NivelesContext';



interface Props extends StackScreenProps<any, any> {}

export const MenuInicio = ({navigation}:Props)=>{
  // loadNiveles();
  const { niveles, loadNiveles } = useContext( NivelContext );
  
  useEffect(() => {
    loadProductsFromBackend();
  }, [])

  const loadProductsFromBackend = async() => {
    await loadNiveles();
  }
  
  
  const scheme = useColorScheme();
    const {user, token, logOut}=useContext(AuthContext);
  return(
    <SafeAreaView style={{flex:1}}>
            <StatusBar
            backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
                barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
            <View style={styles.container}>
                <IconButton
                    icon="menu"
                    size={30}
                    style={{marginLeft:-10,marginBottom:20}}
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
                />
                <Text style={{color:(scheme === 'dark')?'white':'black',fontSize:25,marginBottom:40}}>Bienvenido <Text style={{fontSize:25,fontWeight:'bold'}}>{user?.nombre}</Text></Text>
                <TouchableOpacity
                    style={{ 
                        ...styles.botonGrande,
                        backgroundColor: '#5856D6'
                    }}
                    onPress={() => navigation.navigate('Primer')}
                >
                  
                    <Text style={ styles.botonGrandeTexto }>Primer grado</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ 
                        ...styles.botonGrande,
                        backgroundColor: '#FF9427'
                    }}
                    onPress={() => navigation.navigate('Seg')}
                >
                    <Text style={ styles.botonGrandeTexto }>Segundo grado</Text>
                </TouchableOpacity>
                <View style={{justifyContent:'flex-end',alignContent:'flex-end',flexDirection:'row',}}>
            <Image source={ require('../assets/images/Recurso2.png') }
                style={{
                    width:undefined,
                height: 200,
                aspectRatio:10/21,
                top:200,
                
                }}
                />
            </View>
                
            </View>
            
        </SafeAreaView> 
  );
}
const styles = StyleSheet.create({
  container:{
    
      flex:1,
      marginTop:0,
      paddingHorizontal:20
  },
  fondo:{
      backgroundColor:'#A6D8F0'
  },
  botonGrande: {
    width:'100%',
    height: 100,
    borderRadius: 20,
    padding:20,
    marginRight: 10,
    marginBottom:20
},
botonGrandeTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
},
});

