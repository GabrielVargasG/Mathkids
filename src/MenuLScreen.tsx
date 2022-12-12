import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MenuInicio } from './screens/MenuInicio';
import { Configuracion } from './screens/Configuracion';
import { Logros } from './screens/Logros';
import { AuthContext } from './context/AuthContex';
import { useWindowDimensions, View, Image, Text, useColorScheme } from 'react-native';
import { InicioScreen } from './screens/InicioScreen';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NivelContext } from './context/NivelesContext';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  
    const { width } = useWindowDimensions();

    return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuInterno { ...props } /> }
      screenOptions={{
                headerShown:false,
            }}
    >
      <Drawer.Screen name="StackNavigator" component={ MenuInicio } />
      <Drawer.Screen name="Configuracion" component={ Configuracion } />
      <Drawer.Screen name="Logros" component={ Logros } />
    </Drawer.Navigator>
  );
}


const MenuInterno = ( { navigation }: DrawerContentComponentProps) => {
    const [state, setState] = useState("First");
    const {logOut}=useContext(AuthContext);
    const {niveles,limpiar}=useContext(NivelContext);
    const scheme = useColorScheme();
    const salir = () =>{
      logOut();
      limpiar();
      console.log(niveles);
    }
  return (
      <View style={{flex:1, backgroundColor:(scheme === 'dark' ? '#121212': '#f6f6f6')}}>
          <SafeAreaView style={{flex:1, marginVertical:20}}>
         <ScrollView style={{flex:1}}>
       <DrawerItem
            // icon={}
            icon={({ color, size }) => (
              <Icon
              name="home"
              color={color}
              size={size}
            />
          )}
          label="Inicio"
          focused={state==="First"}
          onPress={() => { setState("First");
          navigation.navigate('StackNavigator');
          navigation.closeDrawer(); }}
       />
       <DrawerItem
        icon={({ color, size }) => (
            <Icon
            name="gear"
            color={color}
            size={size}
          />
        )}
          label="Configuracion"
          focused={state==="Second"}
          onPress={() => { setState("Second");
          navigation.navigate('Configuracion');
          navigation.closeDrawer(); }}
       />
       <DrawerItem
        icon={({ color, size }) => (
            <Icon
            name="trophy"
            color={color}
            size={size}
          />
        )}
          label="Logros"
          focused={state==="Third"}
          onPress={() => { setState("Third");
          navigation.navigate('Logros');
          navigation.closeDrawer(); }}
       />
       </ScrollView>
       <View >
       <DrawerItem
       icon={({ color, size }) => (
        <Icon
        name="sign-out"
        color={color}
        size={size}
      />
    )}
            label="Cerrar Sesion"
            style={{}}
            onPress={salir}
        />
             </View>
             </SafeAreaView>
       </View>
    
  );
}

// export function MenuL(){
//     const {logOut}=useContext(AuthContext);
//   return (
      
//     <Drawer.Navigator
//     // initialRouteName="Inicio"
    
//     screenOptions={{
//         headerShown:false,
//     }}
//     >
//       <Drawer.Screen name="Inicio" component={MenuInicio} />
//       <Drawer.Screen name="Configuracion" component={Configuracion } />
      
//     </Drawer.Navigator>
//   );
// }

export const MenuScreen = () => {

    return (
        <>
        <MenuLateral/>
         
        </>
    );
}

