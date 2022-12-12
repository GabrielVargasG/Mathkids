import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import mathApi from '../api/mathApi';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ({correo,nombre,password}: RegisterData) => void;
    signIn: (logginData:LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });
        // Hay token
        const resp = await mathApi.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        await AsyncStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });
    }

    const signIn= async( {correo,password}:LoginData) => {
        try{
            const res = await mathApi.post<LoginResponse>('/auth/login', { correo, password } );
            console.log(res.data)
            dispatch({
                type:'signUp',
                payload:{
                    token:res.data.token,
                    user:res.data.usuario
                }
            });
            await AsyncStorage.setItem('token', res.data.token );
        }catch(error:any){
            // console.log(...error.response.data.errors[0].msg
            // console.log(error.response.data.msg)
            dispatch({type:'addError',
                payload:error.response.data.msg||error.response.data.errors[0].msg||'Inicio de sesion invalido'
            })
        }
    };

    const signUp= async({correo,nombre,password}:RegisterData) => {
        try{
            const res = await mathApi.post<LoginResponse>('/usuarios', { correo, password,nombre } );
            console.log(res.data);
            dispatch({
                type:'signUp',
                payload:{
                    token:res.data.token,
                    user:res.data.usuario
                }
            });
            await AsyncStorage.setItem('token', res.data.token );
            const res2 = await mathApi.get<LoginResponse>('/usuarios/niveles');
            console.log(res2.data);
        }catch(error:any){
            // console.log(...error.response.data.errors[0].msg)
            dispatch({type:'addError',
                payload:error.response.data.msg||error.response.data.errors[0].msg||'Error al crear usuario invalido'
            })
        }
    };
    const logOut= async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };
    const removeError= () => {
        dispatch({
            type:'removeError'
        })
    };

    // const signUp = async( { nombre, correo, password }: RegisterData ) => {

    //     try {
         
    //         const { data } = await mathApi.post<LoginResponse>('/usuarios', { correo, password, nombre } );
    //         dispatch({ 
    //             type: 'signUp',
    //             payload: {
    //                 token: data.token,
    //                 user: data.usuario
    //             }
    //         });

    //         await AsyncStorage.setItem('token', data.token );

    //     } catch (error) {
    //         dispatch({ 
    //             type: 'addError', 
    //             payload: error.response.data.errors[0].msg || 'Revise la información'
    //         });
    //     }

    // };

    // const logOut = async() => {
    //     await AsyncStorage.removeItem('token');
    //     dispatch({ type: 'logout' });
    // };

    // const removeError = () => {
    //     dispatch({ type: 'removeError' });
    // };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )

}
