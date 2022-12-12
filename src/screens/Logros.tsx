import React from 'react';
import { StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native';
import { theme } from '../../App';
import { IconButton } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<any, any> {}

export const Logros = ({navigation}:Props) => {
    const scheme = useColorScheme();
    return (
        <>
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
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                    <Text style={{color:(scheme === 'dark')?'white':'black',fontSize:25,marginBottom:40}}>Logros</Text>
                    
                </View>
            </SafeAreaView> 
        </>
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