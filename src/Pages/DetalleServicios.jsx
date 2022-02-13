import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../authContext';
import DataService from "../data";


const DetalleServicios = (item) => {

    const { getConfig } = useContext(AuthContext)
    const [apiServicios, setApiServicios] = useState("");
    const [imagenServicio, setImagenServicio] = useState("");
    const [puntoServicio, setPuntoServicio] = useState({})

    useEffect(() => {

        getConfig().then((config) => {
            setApiServicios(config.apiMapeoServicios)
            
            

        });

        setPuntoServicio(item.puntoServicios)

        getApiMapeo();

        
        


    }, [apiServicios]);
    
    const getApiMapeo = () => {
        
        DataService.getAllServicios(apiServicios)
            .then(response => {

                var service = response.data.find((element) => {
                    return element.id_servicio === puntoServicio.Servicio_id;
                  })

                  setImagenServicio(service)

            })
            .catch(e => {
                console.log(e);
            });

        

        
            


    };


    return (

        <div className='punto-div-8'>
            <img width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site'+imagenServicio?.img_servicio} />

            <div className='punto-div-9'>
                <label className='service-label-1'>{puntoServicio.Servicio}</label>

                <label className='service-label-2'>{puntoServicio.Descripcion_Servicio}</label>
                <label className='service-label-3'>Organización(es) principal(es)</label>
                <label className='service-label-4'>{puntoServicio.Organizacion_es}</label>
            </div>
        </div>
    )




}
export default DetalleServicios;