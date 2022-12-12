import React from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingScreen = () => {
    const scheme = useColorScheme();
    return (
        <>
        <StatusBar
            backgroundColor={(scheme === 'dark') ? '#121212' : '#f6f6f6'}
            barStyle={(scheme === 'dark') ? 'light-content' : 'dark-content'}
            />
        <View
            style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:scheme === 'dark' ? '#121212' : '#f6f6f6'}}
        >
            
            <ActivityIndicator
                size={50}
                color={'#3498db'}
            />
        </View> 
        </>
    );
}