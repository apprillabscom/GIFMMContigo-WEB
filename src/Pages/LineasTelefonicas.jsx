import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";

import AuthContext from '../authContext';
import DetalleDirectorio from './DetalleDirectorio';


const LineasTelefonicas = () => {
    const { getConfig } = useContext(AuthContext)
    const [apiDirectory, setApiDirectory] = useState("");
    const [apiLineasTelefonicasServicios, setApiLineasTelefonicasServicios] = useState("");
    const [dataLineas, setDataLineas] = useState([]);
    const [dataLineasTel, setDataLineasTel] = useState([]);
    const [dataLineasT, setDataLineasT] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showFiltros, setShowFiltros] = useState(false);
    const [dataLinea, setDataLinea] = useState({})
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state

    useEffect(() => {
        let i = 0;
        getConfig().then((config) => {
            setApiDirectory(config.apiLineasTelefonicas)
            setApiLineasTelefonicasServicios(config.apiLineasTelefonicasServicios)
            getLineasTelefonicas()
            getServicios();

        });

    }, [apiDirectory, apiLineasTelefonicasServicios]);

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

                setDataLineasT(response.data.sort(function (a, b) {
                    return compareObjects(a, b, 'departamento')
                }))
            })
            .catch(e => {
                console.log(e);
            });


    };

    const getServicios = () => {
        DataService.getAllServiciosTel(apiLineasTelefonicasServicios)
            .then(response => {
                console.log(response.data)
                var arr = [];
                response.data.map(index => {

                    arr.push({ name: index.nombre, label: index.nombre, value: index.id });

                })
                setDataLineasTel(arr)


            })
            .catch(e => {
                console.log(e);
            });


    };

    const consultarDepartamento = (item) => {


        setDataLinea(item);
        setShowResults(true)
    }

    const cerrarModal = () => {


        setDataLinea({});
        setShowResults(false)
    }

    const buscar = (event) => {
        if (event.keyCode === 13) {

            let busqueda = accent_fold(event.target.value.toLowerCase())


            const array3 = [];
            dataLineas.map(element => {
                var todos = false;

                element.LineasTelefonicas.map(item => {

                    let tipo_linea = accent_fold(item.tipo_de_linea.toLowerCase())

                    if (tipo_linea.includes(busqueda)) {
                        todos = true;
                    }


                })
                if (todos) {
                    array3.push(element);
                }


            })




            const value = dataLineas.filter((item) => {

                let depart = accent_fold(item.departamento.toLowerCase());

                return depart.includes(busqueda)

            });



            let array_concat = array3.concat(value);
            setDataLineasT(array_concat)
        }

    }
    const handleChange = (event) => {
        // updating an object instead of a Map
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }

    const accent_fold = (s) => {
        var accent_map = { 'á': 'a', 'é': 'e', 'è': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'a', 'É': 'e', 'è': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u' };

        if (!s) { return ''; }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            ret += accent_map[s.charAt(i)] || s.charAt(i);
        }
        return ret;
    };

    const openFiltros = () => {
        setShowFiltros(!showFiltros)
    }

    const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => {

        return (<input type={type} name={name} checked={checked} onChange={onChange} />)
    }

    const filtrarServicios = () => {
        setShowFiltros(false);

        const array = [];

        Object.keys(checkedItems).forEach(function (key) {

            let array2 = {};
            array2.selected = checkedItems[key];;
            array2.servicio = key;
            array.push(array2)

        });

        let value = [];

        if (array.length > 0) {

            console.log(dataLineas);

            const array3 = [];
            dataLineas.map(element => {
                var todos = false;

                element.LineasTelefonicas.map(item => {


                    array.map(service => {

                        console.log(service);

                        if (service.servicio === item.tipo_de_linea && service.selected == true) {
                            todos = true;
                        }
                    })

                })
                if (todos) {
                    array3.push(element);
                }


            })
            setDataLineasT(array3)
        }

    }
    const borrarFiltros = () => {
        setShowFiltros(false)
        setCheckedItems({})

        setDataLineasT(dataLineas);
    }


    return (
        <div className='container-lineas'>

            <div className='lineas-filtro'>
                <div className='lineas-filtro-1'>
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.314 19.742L16.031 15.46C17.3082 13.8667 18.0029 11.885 18 9.84299C18 4.87499 13.968 0.842987 9 0.842987C4.032 0.842987 0 4.87499 0 9.84299C0 14.811 4.032 18.843 9 18.843C11.042 18.8459 13.0237 18.1512 14.617 16.874L18.899 21.157L20.314 19.742ZM16 9.84299C16.0029 11.6634 15.2941 13.4129 14.025 14.718L13.875 14.868C12.5699 16.1371 10.8204 16.8459 9 16.843C5.132 16.843 2 13.71 2 9.84299C2 5.97499 5.132 2.84299 9 2.84299C12.867 2.84299 16 5.97499 16 9.84299Z" fill="#425565" />
                    </svg>
                    <input type={'text'} placeholder="Buscar departamento o servicio" onKeyDown={(e) => buscar(e)} />
                </div>
                <div className='lineas-filtro-2' onClick={() => openFiltros()}>
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#00AAAD" />
                    </svg>
                    <label className='lineas-filtro-l1'>Busqueda por filtro</label>
                </div>

            </div>
            {showFiltros ?
                <div className='filtro-div-5'>
                    <label className='filtro-label-2'>Tipo de Servicio</label>
                    <div className='grid-filtros-ser'>

                        {
                            dataLineasTel.map(item => (
                                <div className='filtro-div-7'>
                                    <label className='filtro-label-3' key={item.key}>
                                        {item.name}

                                    </label>
                                    <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                </div>
                            ))
                        }


                    </div>
                    <div className='filtro-div-8'>
                        <div className='filtro-div-9' onClick={() => borrarFiltros()}>
                            <label className='filtro-label-4'>Borrar</label>
                        </div>
                        <div className='filtro-div-10' onClick={() => filtrarServicios()}>
                            <label className='filtro-label-5'>Filtrar</label>
                        </div>

                    </div>
                </div>

                : null}
            <div className='div-lineas-1'>
                {dataLineasT != undefined && dataLineasT.map((item, i) => (
                    <div className="itemDepar" key={i} onClick={() => consultarDepartamento(item)}>
                        <div className='itemDivLabel'>
                            {item.icon.url !== undefined ?
                                <img src={item.icon.url} alt="Logo" className="logoDepartImg" />
                                :
                                <div className="logoDepartImg"></div>
                            }
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
                        <DetalleDirectorio item={dataLinea.departamento} apiDirectory={apiDirectory} />
                    </div>
                </div>
                : null}



        </div>
    );
}
export default LineasTelefonicas;