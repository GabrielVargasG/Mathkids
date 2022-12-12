import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, useColorScheme, StatusBar, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../App';
import { StackScreenProps } from '@react-navigation/stack';
import {NivelContext} from '../context/NivelesContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props extends StackScreenProps<any, any> {}
export const COLORS = {
  primary: "#252c4a",
  secondary: '#1E90FF',
  accent: '#3498db',
  
  success: '#00C851',
  error: '#ff4444',

  black: "#171717",
  white: "#FFFFFF",
  background: "#252C4A"
}
export var nivelA = "";

export const PrimerGrado = ({navigation}:Props) => {
  
  const { niveles,loadNiveles} = useContext( NivelContext );
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
        <Text style={{color:(scheme === 'dark')?'white':'black',fontSize:25,marginBottom:20}}>Primer Grado</Text>
        <FlatList
            data={niveles}
            renderItem={({ item}) =>(
              item.completo ==="true" ?
              <View>
                <TouchableOpacity
                                style={{ 
                                    ...styles.botonGrande,
                                    // backgroundColor: '#5856D6'
                                    backgroundColor:(item.completo === "true") ? "#2a9d8f" : '#5856D6'
                                }}
                                onPress={() => {nivelA=item._id;
                                ira(item.action)}}
                            >
                              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <View>
                                <Text style={styles.botonGrandeTexto }>{item.nombre}</Text>
                                <Text style={ styles.botonTexto }>Calificacion: {item.valor}</Text>
                                {/* <Text style={ styles.botonTexto }>id: {item._id}</Text> */}
                                </View>
                                <View style={{width: 40, height: 40, borderRadius: 100,
                                        backgroundColor: COLORS.white,
                                        justifyContent: 'center', alignItems: 'center'}}>
                                  <MaterialCommunityIcons name="check" style={{
                                            color: '#2a9d8f',
                                            fontSize: 30
                                        }} />
                                        </View>
                              </View>
                              
                            </TouchableOpacity>
                </View>
                : 
                <View>
                <TouchableOpacity
                                style={{ 
                                    ...styles.botonGrande,
                                    // backgroundColor: '#5856D6'
                                    backgroundColor:(item.completo === "true") ? "#2a9d8f" : '#5856D6'
                                }}
                                onPress={() => {nivelA=item._id;
                                ira(item.action)}}
                            >
                              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                <View>
                                <Text style={styles.botonGrandeTexto }>{item.nombre}</Text>
                                <Text style={ styles.botonTexto }>Calificacion: {item.valor}</Text>
                                {/* <Text style={ styles.botonTexto }>id: {item._id}</Text> */}
                                </View>
                              </View>
                              
                            </TouchableOpacity>
                            </View>
            )}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
    
        flex:1,
        marginTop:20,
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