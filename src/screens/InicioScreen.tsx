import React, { useContext } from 'react';
import { StyleSheet, View, StatusBar, useColorScheme, Image, ImageBackground } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../context/AuthContex';
import { Drawer } from 'react-native-paper';

interface Props extends StackScreenProps<any, any> {}

export const InicioScreen = ({navigation}:Props) => {

    const scheme = useColorScheme();
    const {user, token, logOut}=useContext(AuthContext);
    const [active, setActive] = React.useState('');
    return (
        <>
        <SafeAreaView style={{...styles.container,backgroundColor:(scheme === 'dark') ? '#0D3E69' : '#A6D8F0'}}>
            <ImageBackground source={require('../assets/images/Recurso6.png')} style={{
                ...styles.container,width: '100%',
                bottom: -50,
                }}>
            {/* <View style={{...styles.container,width: '100%',backgroundColor: '#A6D8F0' }}> */}

            <StatusBar
                backgroundColor={(scheme === 'dark') ? '#0D3E69' : '#A6D8F0'}
                barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
            <Image source={ require('../assets/images/Recurso4.png') }
                style={{width: 130,
                    height: '25%' ,
                    aspectRatio:139 / 93,
                    top:15
                }}
            />
                   
            <View style={styles.container}>
                <IconButton
                    icon="play-circle"
                    color='#FFBE2E'
                    size={130}
                    style={{top:-70}}
                    onPress={() => navigation.navigate('Menu')}
                />   
                
            </View>
            {/* </View> */}
            </ImageBackground>
        </SafeAreaView>  
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    fondo:{
        backgroundColor:'#A6D8F0'
    }
});