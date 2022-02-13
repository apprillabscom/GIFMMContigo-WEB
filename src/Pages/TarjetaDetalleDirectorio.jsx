import React, { useState, useEffect, useContext } from 'react';

const TarjetaDetalleDirectorio = (props) => {
    const {
        title = "",
        subTitle = "",
        subTitle1 = "",
        subTitle2 = "",
        subTitle3 = "",
    } = props || {};

    const [openDetalle, setOpenDetalle] = useState(false)
    const abrirDetalle = () => {

        setOpenDetalle(!openDetalle)
    }

    return (
        <>
            <div className="itemDeparD" onClick={() => abrirDetalle()}>
                <div>
                    <span className="input-label-d">{title.toLowerCase()}</span>
                </div>
                <div>
                    {openDetalle ?
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.00023 2.828L2.05023 7.778L0.63623 6.364L7.00023 0L13.3642 6.364L11.9502 7.778L7.00023 2.828Z" fill="#003031" />
                        </svg>
                        :
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.00023 5.17198L11.9502 0.221985L13.3642 1.63598L7.00023 7.99998L0.63623 1.63598L2.05023 0.221985L7.00023 5.17198Z" fill="#003031" />
                        </svg>
                    }
                </div>


            </div>
            {openDetalle ?
                <div className='detalle-tarjeta'>

                    <label className='label-nombre-organizacion'>{subTitle1}</label>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 11.6833V14.63C15.5001 14.841 15.4202 15.0441 15.2763 15.1985C15.1325 15.3528 14.9355 15.4469 14.725 15.4617C14.3608 15.4867 14.0633 15.5 13.8333 15.5C6.46917 15.5 0.5 9.53083 0.5 2.16667C0.5 1.93667 0.5125 1.63917 0.538333 1.275C0.553102 1.06454 0.647151 0.867509 0.801503 0.723674C0.955855 0.579839 1.15902 0.499905 1.37 0.5H4.31667C4.42003 0.499896 4.51975 0.538216 4.59644 0.607517C4.67313 0.676818 4.72133 0.772152 4.73167 0.875C4.75083 1.06667 4.76833 1.21917 4.785 1.335C4.95061 2.49077 5.29 3.61486 5.79167 4.66917C5.87083 4.83583 5.81917 5.035 5.66917 5.14167L3.87083 6.42667C4.97038 8.98871 7.01212 11.0305 9.57417 12.13L10.8575 10.335C10.91 10.2617 10.9865 10.2091 11.0737 10.1864C11.161 10.1637 11.2535 10.1723 11.335 10.2108C12.3892 10.7116 13.513 11.0501 14.6683 11.215C14.7842 11.2317 14.9367 11.25 15.1267 11.2683C15.2294 11.2789 15.3245 11.3271 15.3936 11.4038C15.4628 11.4805 15.501 11.5801 15.5008 11.6833H15.5Z" fill="#003031" />
                        </svg>
                        <label className='label-telefono'>{subTitle2.length > 0 ? subTitle2[0].value : ''}</label>

                    </div>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.00008 17.3334C4.39758 17.3334 0.666748 13.6025 0.666748 9.00002C0.666748 4.39752 4.39758 0.666687 9.00008 0.666687C13.6026 0.666687 17.3334 4.39752 17.3334 9.00002C17.3334 13.6025 13.6026 17.3334 9.00008 17.3334ZM9.83342 9.00002V4.83335H8.16675V10.6667H13.1667V9.00002H9.83342Z" fill="#003031" />
                        </svg>
                        <label className='label-horario'>{subTitle3}</label>
                    </div>
                </div>
                : null}
        </>
    )

}
export default TarjetaDetalleDirectorio;