import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useWindowDimensions } from 'react-native';
import { InicioScreen } from './screens/InicioScreen';

const Drawer = createDrawerNavigator();

export const MenuLateralBasico = () => {
  
    const { width } = useWindowDimensions();

    return (
      <>
    <Drawer.Navigator
    >
      <Drawer.Screen name="StackNavigator" options={{ title: 'Home' }} component={ InicioScreen } />
      <Drawer.Screen name="SettingsScreen" options={{ title: 'Settings' }} component={ InicioScreen } />
      
    </Drawer.Navigator>
    </>
  );
}