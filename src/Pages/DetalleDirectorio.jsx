import React, { useState, useEffect, useContext } from 'react';
import TarjetaDetalleDirectorio from './TarjetaDetalleDirectorio';
import DataService from "../data";
const DetalleDirectorio = (props) => {


    const [dataLineasT, setDataLineasT] = useState({})


    useEffect(() => {


        DataService.getAllLineasTelefonicas(props.apiDirectory)
            .then(response => {
                let array1 = response.data.find((item) => item.departamento === props.item).LineasTelefonicas
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
                console.log(e);
            });


    }, []);





    return (

        <div>
            
            {


                Object.keys(dataLineasT).map(function(key,index) {
                    return(
                        
                        <TarjetaDetalleDirectorio
                            title={key} detalle= {dataLineasT[key]}
                        />
                    )

                })}
        </div>
    )



}
export default DetalleDirectorio;