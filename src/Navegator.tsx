import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { InicioScreen } from './screens/InicioScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegistroScreen } from './screens/RegistroScreen';
import { AuthContext } from './context/AuthContex';
import { LoadingScreen } from './screens/LoadingScreen';
import { MenuScreen } from './MenuLScreen';
import { Configuracion } from './screens/Configuracion';
import { PrimerGrado } from './screens/PrimerGrado';
import { SegGrado } from './screens/SegGrado';
import Nivel1 from './screens/Niveles1/Nivel1';
const Stack = createStackNavigator();

export const Navegator = () => {
  const {status}=useContext(AuthContext);
  
  if(status==='checking')return<LoadingScreen/>

  return (
    <Stack.Navigator
      screenOptions={{headerShown:false}}
    >
      {
        (status !== 'authenticated') 
          ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registro" component={RegistroScreen} />
            </>
          )
          : (
            <>
                  {/* <Drawer.Navigator>
                    <Drawer.Screen name="Inicio" component={InicioScreen} />
                    <Drawer.Screen name="Configuracion" component={Configuracion } />
                  </Drawer.Navigator> */}
                  {/* <MenuLateralBasico/> */}
              <Stack.Screen name="Inicio" component={InicioScreen} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Primer" component={PrimerGrado} />
              <Stack.Group>
                <Stack.Screen name="Nivel1" component={Nivel1} />
              </Stack.Group>
              <Stack.Screen name="Seg" component={SegGrado} />
            </>
          )
      }
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}