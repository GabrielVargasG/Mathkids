import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import mathApi from '../api/mathApi';
import { Niveles, NivelesResponse } from '../interfaces/appInterfaces';

type NivelContextProps = {
    // n:string|undefined;
    limpiar:()=> void;
    // cambiarNA:(id: string) => void;
    niveles: Niveles[];
    niveles2: Niveles[];
    loadNiveles: () => Promise<void>;
    addNivel: ( categoryId: string, productName: string ) => Promise<Niveles>;
    updateNivel: ( valor: number, productId: string ) => Promise<void>;
    // deleteProduct: ( id: string ) => Promise<void>;
    // loadProductById: ( id: string ) => Promise<Niveles>;
}



export const NivelContext = createContext({} as NivelContextProps);



export const NivelesProvider = ({ children }: any ) => {

    // const [n, setN] = useState<string>();
    const [niveles, setNiveles] = useState<Niveles[]>([]);
    const [niveles2, setNiveles2] = useState<Niveles[]>([]);

    // useEffect(() => {
    //     loadNiveles();
    // }, [])

  //   const cambiarNA = (id:string) =>{
  //     console.log(id);
  //     setN(id);
  //     console.log(n);
  // }
    const limpiar = () =>{
        setNiveles([]);
        setNiveles2([]);
    }


    const loadNiveles = async() => {
        const resp = await mathApi.get<NivelesResponse>('/productos');
        setNiveles([ ...resp.data.niveles ].filter(item=> {
            if(item.grado.match("1")){return true}
          }).sort((a,b)=>{
                if(a.nombre>b.nombre){
                  return 1;
                }else{
                  if(b.nombre>a.nombre){
                    return -1;
                  }else{
                    return 0;
                  }
                }
              }));
              setNiveles2([ ...resp.data.niveles ].filter(item=> {
                if(item.grado.match("2")){return true}
              }).sort((a,b)=>{
                    if(a.nombre>b.nombre){
                      return 1;
                    }else{
                      if(b.nombre>a.nombre){
                        return -1;
                      }else{
                        return 0;
                      }
                    }
                  }));
    }

    const addNivel = async( categoryId: string, NivelName: string ): Promise<Niveles> => {
        
        const resp = await mathApi.post<Niveles>('/productos', {
            nombre: NivelName,
            categoria: categoryId
        });
        setNiveles([ ...niveles, resp.data ]);
        
        return resp.data;
    }

    const updateNivel = async( valor: number, nivelId: string) =>{
        const resp = await mathApi.put<Niveles>(`/productos/${ nivelId }`, {
            valor: valor,
            completo:"true"
        });
        setNiveles( niveles.map( prod => {
            return (prod._id === nivelId )
                    ? resp.data
                    : prod;
        }) );
    }

    // const loadProductById = async( id: string ):Promise<Niveles> => {
    //     const resp = await mathApi.get<Niveles>(`niveles/${ id }`);
    //     return resp.data;
    // };

    // // TODO: cambiar ANY
    // const uploadImage = async( data: any, id: string ) => {
        
    // }

    return(
        <NivelContext.Provider value={{
            limpiar,
            niveles,
            // n,
            // cambiarNA,
            niveles2,
            loadNiveles,
            addNivel,
            updateNivel,
            // deleteProduct,
            // loadProductById,
        }}>
            { children }
        </NivelContext.Provider>
    )
}
