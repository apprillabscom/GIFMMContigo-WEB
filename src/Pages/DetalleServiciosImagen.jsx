import React, { useState, useEffect, } from 'react';



const DetalleServiciosImagen = (props) => {

    const [imagenServicio, setImagenServicio] = useState("");
    
    useEffect(async () => {

        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(props.apiBase+''+props.apiServicios,requestOptions)
            .then(response => response.json())
            .then(data => {
                
                var service = data.find((element) => {
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