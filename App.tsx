
import { NavigationContainer , DefaultTheme,DarkTheme } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import {useColorScheme} from 'react-native';
import { Navegator } from './src/Navegator';
import { AuthProvider } from './src/context/AuthContex';
import { NivelesProvider } from './src/context/NivelesContext';
import Quiz from './src/components/Quiz';

export const AppDark = {
  ...DarkTheme,
  roundness: 10,
  colors: {
    ...DarkTheme.colors,
    background:'#121212',
    primary: '#3498db',
  },
};

export const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      background: '#f6f6f6',
      primary: '#3498db',
    },
};

const AppState =({children}:any)=>{
  return(
   <AuthProvider>
    <NivelesProvider>
     {children}
     </NivelesProvider>
   </AuthProvider>
  )
}

 const App = () => {
  const scheme = useColorScheme();
  return (
    <PaperProvider >
      <AppState>
        <NavigationContainer
          theme={scheme === 'dark' ? AppDark : theme}
        >
          <Navegator/>
        </NavigationContainer>
      </AppState>
    </PaperProvider>
  );
}

export default App;