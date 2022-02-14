import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import DetalleServiciosImagen from './DetalleServiciosImagen';
import {isMobile} from 'react-device-detect';
import 'leaflet/dist/leaflet.css';
import TarjetaDetallePunto from './TarjetaDetallePunto';
import Select from 'react-select'

const PuntosServicio = (props) => {
    const [dataServicios, setDataServicios] = useState([]);

    const [dataPuntos, setDataPuntos] = useState([]);
    const [dataPuntosT, setDataPuntosT] = useState([]);
    const position = [5.5204723, -67.7419737];
    const [showResults, setShowResults] = useState(false);
    const [showFiltros, setShowFiltros] = useState(true);
    const [dataPunto, setDataPunto] = useState({})
    const [departamentosMap, setDepartamentosMap] = useState([]);
    const [municipiosMap, setMunicipiosMap] = useState([]);
    const [estadosMap, setEstadosMap] = useState([]);
    const [selectDepart, setSelectDepart] = useState("");
    const [selectMuni, setSelectMuni] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state



    useEffect(() => {



        DataService.getAllMapas(props.apiMaps)
            .then(response => {

                const value = response.data.filter(function (item) {
                    const textVisible = item.Visible_publico;
                    const textState = item.Estado_id;
                    const textType = item.Tipo_ubicacion;



                    return (props.estadoTexto.indexOf(textState) > -1 && props.estadoTipo.indexOf(textType) > -1 && props.activeVisible.indexOf(textVisible) > -1);

                })
                setDataPuntos(value);
                setDataPuntosT(value)

                getServicios();

                console.log("entre", value)
                const uniqueEstados = Array.from(new Set(value && value.map((item) => item.Estado)));

                let arrayE = [];
                uniqueEstados.map((item) => {
                    let arrayE2 = {};
                    arrayE2.value = item;
                    arrayE2.label = item;
                    arrayE.push(arrayE2)
                });

                setEstadosMap(arrayE.sort(function (a, b) {
                    var nameA = a.label !== undefined ? a.label.toUpperCase() : ""; // ignore upper and lowercase
                    var nameB = b.label !== undefined ? b.label.toUpperCase() : ""; // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                }));

                const uniqueDepartametos = Array.from(new Set(value.map((item) => item.Departamento)));

                let arrayD = [];
                uniqueDepartametos.map((item) => {
                    let array2 = {};
                    array2.value = item;
                    array2.label = item;
                    arrayD.push(array2)
                });

                setDepartamentosMap(
                    arrayD.sort(function (a, b) {
                        var nameA = a.label !== undefined ? a.label.toUpperCase() : ""; // ignore upper and lowercase
                        var nameB = b.label !== undefined ? b.label.toUpperCase() : ""; // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;
                    })
                );

            })
            .catch(e => {
                console.log(e);
            });











    }, [])





    const getServicios = () => {
        DataService.getAllServicios(props.apiServicios).then(response => {

            const value = response.data.filter(function (item) {
                const textVisible = item.visibilidad_servicio;



                return (textVisible === "SI");

            })

            var arr = [];
            value.map(index => {

                arr.push({ name: index.servicio, label: index.servicio, value: index.id_servicio, img_servicio: index.img_servicio });

            })
            setDataServicios(arr)
        })
            .catch(e => {
                console.log(e);
            });
    }


    const handleChange = (event) => {
        // updating an object instead of a Map
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }




    const getEstados = () => {



    }


    const consultarPunto = (item) => {

        setShowResults(true)
        setDataPunto(item)
    }

    const cerrarModal = () => {

        setDataPunto({})
        setShowResults(false)
    }

    const handleChangeDepart = (selectDepart) => {

        setSelectMuni("");
        let departamento = selectDepart.value;
        setSelectDepart(selectDepart)
        let arraymun = dataPuntos.filter(function (puntos) {
            let dep = puntos.Departamento !== undefined ? puntos.Departamento : "";
            return dep.toString().toLowerCase().includes(departamento.toString().toLowerCase())
        });

        const uniqueMunicipios = Array.from(new Set(arraymun.map((item) => item.Municipio)));

        let array = [];
        uniqueMunicipios.map((item) => {
            let array2 = {};
            array2.value = item;
            array2.label = item;
            array.push(array2)
        });


        setMunicipiosMap(array.sort(function (a, b) {
            var nameA = a.label !== undefined ? a.label.toUpperCase() : ""; // ignore upper and lowercase
            var nameB = b.label !== undefined ? b.label.toUpperCase() : ""; // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        }));


    }

    const handleChangeMuni = (selectMuni) => {

        setSelectMuni(selectMuni)

    }

    const handleChangeEstados = (selectEstado) => {

        setSelectEstado(selectEstado)

    }
    const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => {

        return (<input type={type} name={name} checked={checked} onChange={onChange} />)
    }

    const filtrarServicios = () => {

        setShowFiltros(false);

        let depaFiltro = selectDepart.value;
        let muniFiltro = selectMuni.value;
        let stateFiltro = selectEstado.value;

        const array = [];

        Object.keys(checkedItems).forEach(function (key) {

            let array2 = {};
            array2.selected = checkedItems[key];;
            array2.servicio = key;
            array.push(array2)

        });

        let value = [];

        if (array.length > 0) {

            const array3 = [];
            dataPuntos.map(element => {
                var todos = false;

                element.Servicios.map(item => {


                    array.map(service => {

                        if (service.servicio === item.Servicio && service.selected == true) {
                            todos = true;
                        }
                    })

                })
                if (todos) {
                    array3.push(element);
                }


            })

            value = array3.filter((item) => {
                if (depaFiltro !== undefined) {
                    if (item.Departamento !== undefined) {
                        return item.Departamento.toLowerCase() === depaFiltro.toLowerCase()
                    }
                } else {
                    return item;
                }
            }).filter((item) => {
                if (muniFiltro !== undefined) {
                    if (item.Municipio !== undefined) {
                        return item.Municipio.toLowerCase() === muniFiltro.toLowerCase()
                    }
                } else {
                    return item;
                }
            })

                .filter((item) => {
                    if (stateFiltro !== undefined) {
                        if (item.Estado !== undefined) {
                            return item.Estado.toLowerCase() === stateFiltro.toLowerCase()
                        }
                    } else {
                        return item;
                    }
                }
                )


        } else {






            value = dataPuntos
                .filter((item) => {
                    if (depaFiltro !== undefined) {
                        if (item.Departamento !== undefined) {
                            return item.Departamento.toLowerCase() === depaFiltro.toLowerCase()
                        }
                    } else {
                        return item;
                    }
                }).filter((item) => {
                    if (muniFiltro !== undefined) {
                        if (item.Municipio !== undefined) {
                            return item.Municipio.toLowerCase() === muniFiltro.toLowerCase()
                        }
                    } else {
                        return item;
                    }
                })

                .filter((item) => {
                    if (stateFiltro !== undefined) {
                        if (item.Estado !== undefined) {
                            return item.Estado.toLowerCase() === stateFiltro.toLowerCase()
                        }
                    } else {
                        return item;
                    }
                }
                )

        }

        setDataPuntosT(value);

    }

    const borrarFiltros = () => {

        setSelectDepart("");
        setSelectMuni("");
        setSelectEstado("");
        setCheckedItems({})

        setDataPuntosT(dataPuntos);

    }

    const volverFiltro = () => {

        setSelectDepart("");
        setSelectMuni("");
        setSelectEstado("");
        setCheckedItems({})
        setShowFiltros(true);

        setDataPuntosT(dataPuntos);

    }

    const comoLlegar = (item) => {

        let coor = item.split(",");
        let latitude = parseFloat(coor[0]);
        let longitude = parseFloat(coor[1]);

        window.open("https://maps.google.com/?q=" + latitude + "," + longitude, '_blank');

    }

    return (

        <>
            <div>
                <MapContainer style={{ position: 'fixed', height: '80vh' }} center={position} zoom={7} scrollWheelZoom={false} id="map">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {dataPuntosT.map((statistic, index) => {

                        if (statistic.Coordenadas !== "") {
                            let coor = statistic.Coordenadas.split(",");
                            let latitude = parseFloat(coor[0]);
                            let longitude = parseFloat(coor[1]);
                            return (
                                <Marker key={index} position={[latitude, longitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                    eventHandlers={{
                                        click: () => {
                                            consultarPunto(statistic);
                                        },
                                    }}
                                >

                                </Marker>
                            )
                        }
                    })}
                </MapContainer>
            </div>
            {showFiltros ?
                <div className='filtro-div'>
                    <div className='filtro-div-1'>
                        <label className='filtro-label-1'>
                            Filtrar puntos de servicio
                        </label>

                    </div>
                    <div className='filtro-div-3'>
                        <div className='filtro-div-4'>
                            <Select width='200px' options={departamentosMap} value={selectDepart}
                                className="select-custom-class" onChange={handleChangeDepart} />
                            <Select options={municipiosMap} value={selectMuni}
                                className="select-custom-class" onChange={handleChangeMuni} />
                            <Select options={estadosMap} value={selectEstado}
                                className="select-custom-class" onChange={handleChangeEstados} />
                        </div>
                        <div className='filtro-div-5'>
                            <label className='filtro-label-2'>Tipo de Servicio</label>
                            <div className='filtro-div-6'>
                                {
                                    dataServicios.map(item => (
                                        <div className='filtro-div-7'>
                                            <img width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site' + item?.img_servicio} />
                                            <label className='filtro-label-3' key={item.key}>
                                                {item.name}

                                            </label>
                                            <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                        </div>
                                    ))
                                }


                            </div>
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




                </div>
                :
                <div className='result-div'>
                    <div className='result-div-1'>
                        <div className='result-div-2'>
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18.9L13.95 13.95C14.9289 12.971 15.5955 11.7237 15.8656 10.3659C16.1356 9.00801 15.9969 7.60058 15.4671 6.32154C14.9373 5.0425 14.04 3.94929 12.8889 3.18015C11.7378 2.41101 10.3844 2.00049 9 2.00049C7.61557 2.00049 6.26222 2.41101 5.11109 3.18015C3.95996 3.94929 3.06275 5.0425 2.53292 6.32154C2.00308 7.60058 1.86442 9.00801 2.13445 10.3659C2.40449 11.7237 3.07111 12.971 4.05 13.95L9 18.9ZM9 21.728L2.636 15.364C1.37734 14.1053 0.520187 12.5017 0.172928 10.7558C-0.17433 9.01001 0.00390685 7.20041 0.685099 5.55588C1.36629 3.91136 2.51984 2.50575 3.99988 1.51683C5.47992 0.527899 7.21998 6.10352e-05 9 6.10352e-05C10.78 6.10352e-05 12.5201 0.527899 14.0001 1.51683C15.4802 2.50575 16.6337 3.91136 17.3149 5.55588C17.9961 7.20041 18.1743 9.01001 17.8271 10.7558C17.4798 12.5017 16.6227 14.1053 15.364 15.364L9 21.728ZM9 11C9.53044 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53042 11 8.99998C11 8.46955 10.7893 7.96084 10.4142 7.58577C10.0391 7.2107 9.53044 6.99998 9 6.99998C8.46957 6.99998 7.96086 7.2107 7.58579 7.58577C7.21072 7.96084 7 8.46955 7 8.99998C7 9.53042 7.21072 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11ZM9 13C7.93914 13 6.92172 12.5786 6.17158 11.8284C5.42143 11.0783 5 10.0608 5 8.99998C5 7.93912 5.42143 6.9217 6.17158 6.17156C6.92172 5.42141 7.93914 4.99998 9 4.99998C10.0609 4.99998 11.0783 5.42141 11.8284 6.17156C12.5786 6.9217 13 7.93912 13 8.99998C13 10.0608 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13Z" fill="#003031" />
                            </svg>

                            <label className='result-label-1'>{selectDepart.value} - {selectMuni.value} - {selectEstado.value}  </label>
                        </div>
                        <div className='result-div-3'>
                            <label onClick={() => volverFiltro()} className='result-label-2'>Volver a Filtrar</label>
                        </div>
                    </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', margin: '20px'}}>
                            {dataPuntosT != undefined && dataPuntosT.map((item, i) => (
                                <div className='result-div-4'>
                                    <label className='result-label-title'>{item.Nombre_punto}</label>
                                    <div className='result-div-5'>

                                        {item.Servicios !== undefined && item.Servicios.map((l, i) => (
                                            <DetalleServiciosImagen puntoServicios={l} apiServicios={props.apiServicios} />

                                        ))}
                                    </div>
                                    <div className='result-div-6'>
                                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.3033 13.47L8 18.7733L2.69667 13.47C1.64779 12.4211 0.933489 11.0847 0.644107 9.62986C0.354725 8.175 0.503256 6.66701 1.07092 5.29657C1.63858 3.92613 2.59987 2.7548 3.83324 1.93069C5.0666 1.10658 6.51665 0.666718 8 0.666718C9.48336 0.666718 10.9334 1.10658 12.1668 1.93069C13.4001 2.7548 14.3614 3.92613 14.9291 5.29657C15.4968 6.66701 15.6453 8.175 15.3559 9.62986C15.0665 11.0847 14.3522 12.4211 13.3033 13.47ZM8 11.5C8.88406 11.5 9.7319 11.1488 10.357 10.5237C10.9821 9.89855 11.3333 9.05071 11.3333 8.16665C11.3333 7.2826 10.9821 6.43475 10.357 5.80963C9.7319 5.18451 8.88406 4.83332 8 4.83332C7.11595 4.83332 6.2681 5.18451 5.64298 5.80963C5.01786 6.43475 4.66667 7.2826 4.66667 8.16665C4.66667 9.05071 5.01786 9.89855 5.64298 10.5237C6.2681 11.1488 7.11595 11.5 8 11.5ZM8 9.83332C7.55798 9.83332 7.13405 9.65772 6.82149 9.34516C6.50893 9.0326 6.33334 8.60868 6.33334 8.16665C6.33334 7.72462 6.50893 7.3007 6.82149 6.98814C7.13405 6.67558 7.55798 6.49999 8 6.49999C8.44203 6.49999 8.86595 6.67558 9.17851 6.98814C9.49107 7.3007 9.66667 7.72462 9.66667 8.16665C9.66667 8.60868 9.49107 9.0326 9.17851 9.34516C8.86595 9.65772 8.44203 9.83332 8 9.83332Z" fill="#902857" />
                                        </svg>
                                        <label className='result-label-4'>
                                            {item.Estado}
                                        </label>

                                    </div>
                                    <div className='result-div-6'>

                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.00008 17.3333C4.39758 17.3333 0.666748 13.6025 0.666748 8.99999C0.666748 4.39749 4.39758 0.666656 9.00008 0.666656C13.6026 0.666656 17.3334 4.39749 17.3334 8.99999C17.3334 13.6025 13.6026 17.3333 9.00008 17.3333ZM9.83342 8.99999V4.83332H8.16675V10.6667H13.1667V8.99999H9.83342Z" fill="#425565" />
                                        </svg>
                                        <label className='result-label-4'>
                                            8:00am - 5:00pm
                                        </label>

                                    </div>
                                    <div className='filtro-div-8'>
                                        <div className='filtro-div-10' onClick={() => consultarPunto(item)}>
                                            <label className='filtro-label-5'>Ver Mas</label>
                                        </div>
                                        <div className='filtro-div-9' onClick={() => comoLlegar(item.Coordenadas)}>
                                            <label className='filtro-label-4'>Como llegar</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                   
                </div>
            }
            {showResults ?
                <div className='modal'>
                    <div className='map-popup'>
                        <div className='map-info-header'>
                            <svg onClick={() => cerrarModal()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" fill="#003031" />
                            </svg>
                            <label className='info-title'>Informacion de punto</label>
                            <div></div>
                        </div>
                        <TarjetaDetallePunto item={dataPunto} />

                    </div>
                </div>
                : null}
        </>

    );
}
export default PuntosServicio;