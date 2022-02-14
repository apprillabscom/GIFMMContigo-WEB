import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../authContext';
import DataService from "../data";


const DetalleServiciosImagen = (props) => {

    const { getConfig } = useContext(AuthContext)
    const [apiServicios, setApiServicios] = useState("");
    const [imagenServicio, setImagenServicio] = useState("");
    const [puntoServicio, setPuntoServicio] = useState({})

    useEffect(() => {

        console.log(props)

        DataService.getAllServicios(props.apiServicios)
            .then(response => {

                
                var service = response.data.find((element) => {
                    return element.id_servicio === props.puntoServicios.Servicio_id;
                  })

                  setImagenServicio(service)

            })
            .catch(e => {
                console.log(e);
            });


        
        


    }, []);
    
    


    return (

            <img width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site'+imagenServicio?.img_servicio} />

            
       
    )




}
export default DetalleServiciosImagen;