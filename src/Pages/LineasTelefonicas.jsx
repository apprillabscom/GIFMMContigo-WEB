import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";

import AuthContext from '../authContext';
import DetalleDirectorio from './DetalleDirectorio';


const LineasTelefonicas = () => {
    const { getConfig } = useContext(AuthContext)
    const [apiDirectory, setApiDirectory] = useState("");
    const [dataLineas, setDataLineas] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [dataLinea, setDataLinea] = useState({})
    useEffect(() => {
        let i = 0;
        getConfig().then((config) => {
            setApiDirectory(config.apiLineasTelefonicas)

            getLineasTelefonicas()

        });

    }, [apiDirectory]);

    useEffect(() => {

        /**/


    }, []);

    const compareObjects = (object1, object2, key) => {
        const obj1 = object1[key].toUpperCase()
        const obj2 = object2[key].toUpperCase()
        if (obj1 < obj2) {
            return -1
        }
        if (obj1 > obj2) {
            return 1
        }
        return 0;
    };
    const getLineasTelefonicas = () => {
        DataService.getAllLineasTelefonicas(apiDirectory)
            .then(response => {
                setDataLineas(response.data);

            })
            .catch(e => {
                console.log(e);
            });

        dataLineas.sort(function (a, b) {
            return compareObjects(a, b, 'departamento')
        })
    };

    const consultarDepartamento = (item) => {

        console.log(item)
        setDataLinea(item);
        setShowResults(true)
    }

    const cerrarModal = () => {


        setDataLinea({});
        setShowResults(false)
    }

    return (
        <>
            <div>
                
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', margin: 'auto' }}>
                {dataLineas != undefined && dataLineas.map((item, i) => (
                    <div className="itemDepar" key={i} onClick={() => consultarDepartamento(item)}>
                        <div className='itemDivLabel'>
                            <img src={item.icon.url} alt="Logo" className="logoDepartImg" />

                            <span className="input-label">{item.departamento.toLowerCase()}</span>
                        </div>
                    </div>
                ))}
            </div>
            {showResults ?
                <div className='modal'>
                <div className='divInformacion'>
                <div className='info-header'>
                        <svg onClick={() => cerrarModal()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" fill="#003031" />
                        </svg>
                        <label className='info-title'>{dataLinea.departamento.toLowerCase()}</label>
                        <div></div>
                    </div>
                    <DetalleDirectorio item={dataLinea}/>
                </div>
                </div>
                : null}



        </>
    );
}
export default LineasTelefonicas;