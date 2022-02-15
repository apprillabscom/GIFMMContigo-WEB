import React, { useState, useEffect, useContext } from 'react';
import DetalleServicios from './DetalleServicios';

const TarjetaDetallePunto = (item) => {

    const [puntoDetalle, setPuntoDetalle] = useState({})
    const [puntoServicios, setPuntoServicios] = useState([])

    useEffect(() => {

        
        setPuntoDetalle(item.item)
        setPuntoServicios(item.item.Servicios)


    }, [puntoDetalle, puntoServicios]);


    const comoLlegar = (item) => {

        let coor = item.split(",");
        let latitude = parseFloat(coor[0]);
        let longitude = parseFloat(coor[1]);

        window.open("https://maps.google.com/?q=" + latitude + "," + longitude, '_blank');

    }
    return (
        <>
            <div className='punto-div-1'>
                <label className='punto-label-1'>{puntoDetalle.Nombre_punto}</label>
                <div className='punto-div-2'>
                    <label className='punto-label-2' onClick={() => comoLlegar(puntoDetalle.Coordenadas)}>¿Como llegar?</label>
                </div>
            </div>
            <div className='punto-div-3'>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                    <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3033 13.47L8 18.7733L2.69667 13.47C1.64779 12.4211 0.933489 11.0847 0.644107 9.62986C0.354725 8.175 0.503256 6.66701 1.07092 5.29657C1.63858 3.92613 2.59987 2.7548 3.83324 1.93069C5.0666 1.10658 6.51665 0.666718 8 0.666718C9.48336 0.666718 10.9334 1.10658 12.1668 1.93069C13.4001 2.7548 14.3614 3.92613 14.9291 5.29657C15.4968 6.66701 15.6453 8.175 15.3559 9.62986C15.0665 11.0847 14.3522 12.4211 13.3033 13.47ZM8 11.5C8.88406 11.5 9.7319 11.1488 10.357 10.5237C10.9821 9.89855 11.3333 9.05071 11.3333 8.16665C11.3333 7.2826 10.9821 6.43475 10.357 5.80963C9.7319 5.18451 8.88406 4.83332 8 4.83332C7.11595 4.83332 6.2681 5.18451 5.64298 5.80963C5.01786 6.43475 4.66667 7.2826 4.66667 8.16665C4.66667 9.05071 5.01786 9.89855 5.64298 10.5237C6.2681 11.1488 7.11595 11.5 8 11.5ZM8 9.83332C7.55798 9.83332 7.13405 9.65772 6.82149 9.34516C6.50893 9.0326 6.33334 8.60868 6.33334 8.16665C6.33334 7.72462 6.50893 7.3007 6.82149 6.98814C7.13405 6.67558 7.55798 6.49999 8 6.49999C8.44203 6.49999 8.86595 6.67558 9.17851 6.98814C9.49107 7.3007 9.66667 7.72462 9.66667 8.16665C9.66667 8.60868 9.49107 9.0326 9.17851 9.34516C8.86595 9.65772 8.44203 9.83332 8 9.83332Z" fill="#902857" />
                    </svg>
                    <label className='punto-label-3'>{puntoDetalle.Estado}</label>
                </div>
                <div className='punto-div-4'>
                    <label className='punto-label-4'>{puntoDetalle.Direccion} </label>
                </div>
                <div className='punto-div-5'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.1248 8.95832C13.8308 8.253 14.3438 7.37829 14.6149 6.41792C14.886 5.45754 14.9061 4.44366 14.6732 3.47332L16.7523 2.58165C16.8157 2.55447 16.8849 2.54346 16.9536 2.5496C17.0223 2.55575 17.0884 2.57886 17.146 2.61686C17.2036 2.65486 17.2508 2.70656 17.2835 2.76732C17.3162 2.82808 17.3332 2.896 17.3332 2.96499V14.8333L11.4998 17.3333L6.49984 14.8333L1.24734 17.0842C1.18393 17.1113 1.11477 17.1223 1.04606 17.1162C0.977347 17.1101 0.911237 17.0869 0.85366 17.0489C0.796083 17.0109 0.748842 16.9593 0.716176 16.8985C0.683511 16.8377 0.666443 16.7698 0.666504 16.7008V4.83332L3.274 3.71582C3.09054 4.6538 3.14059 5.62251 3.41976 6.53659C3.69892 7.45067 4.19863 8.28205 4.87484 8.95749L8.99984 13.0833L13.1248 8.95832ZM11.9465 7.77999L8.99984 10.725L6.05317 7.77915C5.47056 7.19639 5.07383 6.45396 4.91315 5.64573C4.75247 4.83751 4.83505 3.99979 5.15044 3.23849C5.46584 2.4772 5.9999 1.82652 6.68508 1.36873C7.37026 0.910938 8.1758 0.666595 8.99984 0.666595C9.82388 0.666595 10.6294 0.910938 11.3146 1.36873C11.9998 1.82652 12.5338 2.4772 12.8492 3.23849C13.1646 3.99979 13.2472 4.83751 13.0865 5.64573C12.9258 6.45396 12.5291 7.19639 11.9465 7.77915V7.77999Z" fill="#425565" />
                    </svg>

                    <label className='punto-label-5'>{puntoDetalle.Municipio} - {puntoDetalle.Departamento}</label>
                </div>

            </div>
            <div className='punto-div-3'>
                Foto del punto
                Foto del punto
            </div>
            <div className='punto-div-3'>
                <label className='punto-label-6'>Horario del punto</label>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99984 17.3333C4.39734 17.3333 0.666504 13.6025 0.666504 9C0.666504 4.3975 4.39734 0.666664 8.99984 0.666664C13.6023 0.666664 17.3332 4.3975 17.3332 9C17.3332 13.6025 13.6023 17.3333 8.99984 17.3333ZM9.83317 9V4.83333H8.1665V10.6667H13.1665V9H9.83317Z" fill="#003031" />
                    </svg>
                    <label>Lunes - Viernes: 9:00 am-12:00 pm, 1:00 pm-4:00 pm</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99984 17.3333C4.39734 17.3333 0.666504 13.6025 0.666504 9C0.666504 4.3975 4.39734 0.666664 8.99984 0.666664C13.6023 0.666664 17.3332 4.3975 17.3332 9C17.3332 13.6025 13.6023 17.3333 8.99984 17.3333ZM9.83317 9V4.83333H8.1665V10.6667H13.1665V9H9.83317Z" fill="#003031" />
                    </svg>
                    <label>Sábado - Domingo: Cerrado</label>
                </div>
            </div>
            <div className='punto-div-6'>
                <label className='punto-label-7'>Servicios</label>

            </div>
            <div className='punto-div-7'>
                
                {puntoServicios !== undefined && puntoServicios.map((l, i) => (
                    <DetalleServicios puntoServicios = {l}/>
                    
                ))}
            </div>

        </>
    )

}
export default TarjetaDetallePunto;