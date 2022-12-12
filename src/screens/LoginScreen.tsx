import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View, useColorScheme, Keyboard, Image, Alert, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContex';
import { useEffect, useState } from 'react';
import { theme, AppDark } from '../../App';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}:Props) => {

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const {email,password,onChange}=useForm({
        email:'',
        password:''
    });

    const{signIn,errorMessage,removeError}=useContext(AuthContext);

    useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Login incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ]);

    
    const onLogin = () =>{
        // console.log({email, password});
        Keyboard.dismiss();
        signIn({correo:email,password});
    }
    
    const scheme = useColorScheme();
    return (
        
        <>
      
        <StatusBar
            backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
            barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
      
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView
                style={{flex:1, }}
                behavior={(Platform.OS==='ios')?'padding':'height'}
                >
                <SafeAreaView style={styles.safe}>
                    <View style={styles.container}>
                        
                        <View style={{alignItems:'center', marginBottom:-20, top:-70}}>
                            <Image source={ require('../assets/Recurso5.png') }
                                style={{width: 130,
                                height: 200 ,
                                aspectRatio:139 / 145
                                }}
                            />
                        </View>
                        
                        <TextInput
                            theme={scheme === 'dark' ? AppDark : theme}
                            label={'Email'}
                            mode={'outlined'}
                            // activeOutlineColor={'#FF8F00'}
                            numberOfLines={1}
                            keyboardType="email-address"
                            placeholder='example@example.com'
                            autoCapitalize='none'
                            maxLength = {80}
                            autoCorrect={false}
                            onSubmitEditing={onLogin}
                            
                            onChangeText={(value) => onChange(value, 'email') }
                            clearTextOnFocus={false}
                        ></TextInput>

                        <TextInput
                            theme={scheme === 'dark' ? AppDark : theme}
                            style={{marginTop:20, } } 
                            label={'Contraseña'}
                            mode={'outlined'}
                            // activeOutlineColor={'#FF8F00'}
                            placeholder='**********'
                            secureTextEntry={secureTextEntry}
                            right={<TextInput.Icon name="eye" theme={scheme === 'dark' ? AppDark : theme} onPress={() => {
                                setSecureTextEntry(!secureTextEntry);
                                return false;
                            }} />}
                            onSubmitEditing={onLogin}
                            onChangeText={(value) => onChange(value, 'password') }
                        ></TextInput>

                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:25}}>
                            <Button 
                                theme={scheme === 'dark' ? AppDark : theme}
                                style={{marginTop:0, }}
                                onPress={()=>navigation.navigate('Registro')}
                            >Registrarse</Button>
                            <Button 
                                theme={scheme === 'dark' ? AppDark : theme}
                                style={{marginTop:0, borderRadius:10 }} 
                                onPress={onLogin}
                                // ()=>navigation.navigate('Inicio')
                            >Ingresar</Button>
                        </View> 
                        
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    );
}

const styles = StyleSheet.create({
    safe:{
        flex:1
    },
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:50
    }
});