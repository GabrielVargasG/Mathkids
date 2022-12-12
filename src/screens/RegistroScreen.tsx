import React,{useContext} from 'react';
import { Text, View, useColorScheme, KeyboardAvoidingView, Keyboard, Image, Platform, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { Button, Checkbox, IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../context/AuthContex';
import { useState } from 'react';
import { AppDark, theme } from '../../App';

interface Props extends StackScreenProps<any, any> {}

export const RegistroScreen = ({navigation}:Props) => {

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const [checked, setChecked] = React.useState(true);

    const {email,password,name,onChange}=useForm({
        email:'',
        password:'',
        name:''
    });
    const{signUp}=useContext(AuthContext);

    const onRegistro = () =>{
        if(checked===true){
            console.log({email, password,name});
            Keyboard.dismiss();
            signUp({correo:email,nombre:name,password});
        }else{
            showModalT();
        }
    }

    const scheme = useColorScheme();

    const [visible, setVisible] = React.useState(false);
    const [modal, setModal] = React.useState(false);

    const showModalT = () => setModal(true);
    const hideModalT = () => setModal(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor:(scheme === 'dark' ? '#424242': 'white'),
        padding: 25,marginHorizontal:20,borderRadius:15, maxHeight:500};

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
                <SafeAreaView
                    style={{flex:1}}
                >
            
                    <View  style={{flex:1,paddingHorizontal:30,justifyContent:'center', }}>
                        <View style={{alignItems:'center', marginBottom:-60, top:-80}}>
                            <Image source={ require('../assets/Recurso3.png') }
                                style={{width: 130,
                                        height: 170 ,
                                        aspectRatio:100 / 100
                                }} 
                            />
                        </View>
                        <TextInput
                            theme={scheme === 'dark' ? AppDark : theme}
                            style={{marginVertical:10, } } 
                            label={'Nombre'}
                            mode={'outlined'}
                            // activeOutlineColor={'#FF8F00'}
                            placeholder='Nombre'
                            autoCapitalize='words'
                            onSubmitEditing={onRegistro}
                            onChangeText={(value) => onChange(value, 'name') }
                        >
                        </TextInput>
                        <TextInput
                            theme={scheme === 'dark' ? AppDark : theme}
                            style={{marginVertical:10, } } 
                            label={'Email'}
                            autoCapitalize='none'
                            mode={'outlined'}
                            // activeOutlineColor={'#FF8F00'}
                            placeholder='Email'
                            onSubmitEditing={onRegistro}
                            onChangeText={(value) => onChange(value, 'email') }
                        >
                        </TextInput>
                        <TextInput
                            theme={scheme === 'dark' ? AppDark : theme}
                            style={{marginVertical:10, } } 
                            label={'Contraseña'}
                            mode={'outlined'}
                            // activeOutlineColor={'#FF8F00'}
                            placeholder='**********'
                            autoCapitalize='none'
                            onSubmitEditing={onRegistro}
                            onChangeText={(value) => onChange(value, 'password') }
                            secureTextEntry={secureTextEntry}
                            right={
                                <TextInput.Icon name="eye" theme={scheme === 'dark' ? AppDark : theme} onPress={() => {
                                setSecureTextEntry(!secureTextEntry);
                                return false;
                                }} />}
                        >
                        </TextInput>

                        <Button
                            theme={scheme === 'dark' ? AppDark : theme}
                            onPress={onRegistro}
                            style={{marginTop:20,paddingBottom:30, borderRadius:10 , width:'50%', alignSelf:'center'}} 
                        >Crear Cuenta</Button>

                        <IconButton
                            style={{position:'absolute',top:0,left:0}}
                            icon="arrow-left"
                            theme={scheme === 'dark' ? AppDark : theme}
                            // color={scheme === 'dark' ? 'white': 'black'}
                            size={28}
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>

                    <Portal theme={scheme === 'dark' ? AppDark : theme}>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <ScrollView>
                                <Text 
                                style={{color:(scheme === 'dark' ? 'white': 'black')}}
                                 >1. ACEPTACIÓN 
                                    En el presente documento (en adelante, el “Contrato”) se establecen los términos y condiciones de Robert Half Internacional Empresa de Servicios Transitorios Limitada, con domicilio en Avenida Isidora Goyenechea 2800 Piso 15. Torre Titanium 7550-647 Las Condes, que serán de aplicación al acceso y uso por parte del Usuario de esta página web (el  “Sitio Web”). Les rogamos lean atentamente el presente Contrato. 
                                    Al acceder, consultar o utilizar el Sitio Web, los Usuarios (“Vd.”, “usted”, “Usuario”, o “usuario”) aceptan cumplir los términos y condiciones establecidos en este Contrato. En caso de que usted no acepte quedar vinculado por los presentes términos y condiciones, no podrá acceder a, ni utilizar, el Sitio Web. 
                                    Robert Half Internacional Empresa de Servicios Transitorios Limitada y sus respectivas empresas afiliadas (en conjunto, “RH”) se reservan el derecho de actualizar el presente Contrato siempre que lo consideren oportuno. En consecuencia, recomendamos al Usuario revisar periódicamente las modificaciones efectuadas al Contrato.
                                    El presente Sitio Web está dirigido exclusivamente a personas residentes en Chile. Los Usuarios residentes o domiciliados en otro país que deseen acceder y utilizar el Sitio Web, lo harán bajo su propio riesgo y responsabilidad, por lo que deberán asegurarse de que dichos accesos y/o usos cumplen con la legislación aplicable en su país.
                                </Text>
                            </ScrollView>
                        </Modal>

                        <Modal visible={modal} onDismiss={hideModalT} contentContainerStyle={containerStyle}>
                            <ScrollView >
                                <Text style={{color:(scheme === 'dark' ? 'white': 'black')}} > Es necesario aceptar los terminos y condiciones.</Text>
                            </ScrollView>
                        </Modal>
                    </Portal>

                </SafeAreaView>
            </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center',position:'absolute',alignSelf:'center' , bottom:30}} >
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    theme={scheme === 'dark' ? AppDark : theme}
                    // color='#FF8F00'
                    onPress={() => {
                        setChecked(!checked);
                    }}
                 />
                <Button labelStyle={{fontSize:12}}
                    
                    theme={scheme === 'dark' ? AppDark : theme}
                    style={{}} onPress={showModal}
                >Terminos y condiciones</Button>
            </View>
        </>
    );
}