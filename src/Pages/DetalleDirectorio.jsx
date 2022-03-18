import React, { useState, useEffect } from 'react';
import TarjetaDetalleDirectorio from './TarjetaDetalleDirectorio';

const DetalleDirectorio = (props) => {


    const [dataLineasT, setDataLineasT] = useState({})


    useEffect( async() => {


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(props.apiBase+''+props.apiDirectory,requestOptions)
            .then(response => response.json())
            .then(data => {
                let array1 = data.find((item) => item.departamento === props.item).LineasTelefonicas
                let nuevoObjeto = {}
                //Recorremos el arreglo 
                array1.forEach(x => {
                    //Si la ciudad no existe en nuevoObjeto entonces
                    //la creamos e inicializamos el arreglo de profesionales. 
                    if (!nuevoObjeto.hasOwnProperty(x.tipo_de_linea)) {
                        nuevoObjeto[x.tipo_de_linea] = {
                            servicios: []
                        }
                    }

                    //Agregamos los datos de profesionales. 
                    nuevoObjeto[x.tipo_de_linea].servicios.push({
                        NombreOrganizacion: x.NombreOrganizacion,
                        telefono_: x.telefono_,
                        tipo_de_linea_id: x.tipo_de_linea_id,
                        horario: x.horario,
                        tipo_de_linea: x.tipo_de_linea
                    })

                })
                setDataLineasT(nuevoObjeto)

            })
            .catch(e => {
                
            });


    });





    return (

        <div>
            
            {


                Object.keys(dataLineasT).map(function(key,index) {
                    return(
                        
                        <TarjetaDetalleDirectorio
                            title={key} detalle= {dataLineasT[key]} open = {index==0?true:false}
                        />
                    )

                })}
        </div>
    )



}
export default DetalleDirectorio;