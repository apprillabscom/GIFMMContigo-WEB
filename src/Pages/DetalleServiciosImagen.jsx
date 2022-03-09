import React, { useState, useEffect, } from 'react';
import DataService from "../data";


const DetalleServiciosImagen = (props) => {

    const [imagenServicio, setImagenServicio] = useState("");
    
    useEffect(() => {

        
        DataService.getAllServicios(props.apiServicios)
            .then(response => {

                
                var service = response.data.find((element) => {
                    return element.id_servicio === props.puntoServicios.Servicio_id;
                  })

                  setImagenServicio(service)

            })
            .catch(e => {
               
            });


        
        


    });
    
    


    return (

            <img alt="img_servicio" width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site'+imagenServicio?.img_servicio} />

            
       
    )




}
export default DetalleServiciosImagen;