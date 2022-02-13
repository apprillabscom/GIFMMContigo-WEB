import React, { useState, useEffect, useContext } from 'react';
import TarjetaDetalleDirectorio from './TarjetaDetalleDirectorio';

const DetalleDirectorio = (item) => {


    const [lineaDetalle, setLineaDetalle] = useState([])
    

    useEffect(() => {

        setLineaDetalle(item.item.LineasTelefonicas)



    }, [lineaDetalle]);


    


    return (

        <div>
            {lineaDetalle !== null && lineaDetalle.map((itema, i) => (
                <>
                
                <TarjetaDetalleDirectorio
                title={itema.tipo_de_linea}
                subTitle1={itema.NombreOrganizacion}
                subTitle2={itema.telefono_}
                subTitle3={itema.horario}
                subTitle={itema.tipo_de_linea_id}
            />
                </>

            ))}
        </div>
    )



}
export default DetalleDirectorio;