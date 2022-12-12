import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, useColorScheme, StatusBar, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../App';
import { StackScreenProps } from '@react-navigation/stack';
import {NivelContext} from '../context/NivelesContext';

interface Props extends StackScreenProps<any, any> {}

export var nivelA = "";

export const SegGrado = ({navigation}:Props) => {
  
  const { niveles2,loadNiveles} = useContext( NivelContext );
  const loadProductsFromBackend = async() => {
    await loadNiveles();
  }
  const ira =(accion:any) => {
    console.log(nivelA)
    navigation.reset({
      index: 0,
      routes: [{ name: accion }],
    });
    // navigation.replace(accion);
  }
  // const cambiar =(accion:any) => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: accion }],
  //   });
  //   // navigation.replace(accion)
  // }

  useEffect(() => {
    loadProductsFromBackend();
    // cambiarNA("10");
  }, [])
  

 
  // console.log(niveles);
  const scheme = useColorScheme();
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
            backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
                barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
      <View style={styles.container}>
        <FlatList
            data={niveles2}
            renderItem={({ item }) =>(
          <View>
            <TouchableOpacity
                            style={{ 
                                ...styles.botonGrande,
                                // backgroundColor: '#5856D6'
                                backgroundColor:(item.completo === "true") ? "#008000" : '#FF9427'
                            }}
                            onPress={() => {nivelA=item._id;
                            ira(item.action)}}
                        >
                          
                            <Text style={styles.botonGrandeTexto }>{item.nombre}</Text>
                            <Text style={ styles.botonTexto }>Calificacion: {item.valor}</Text>
                            {/* <Text style={ styles.botonTexto }>id: {item._id}</Text> */}
                            
                        </TouchableOpacity>
            </View>)}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
    
        flex:1,
        marginTop:40,
        paddingHorizontal:20
    },
    botonGrande: {
        width:'100%',
        height: 100,
        backgroundColor: 'red',
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
    botonTexto: {
      color: 'white',
      fontSize: 18,
  },
  });