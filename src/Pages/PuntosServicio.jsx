import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css';
import TarjetaDetallePunto from './TarjetaDetallePunto';
import Select from 'react-select'

const PuntosServicio = (props) => {
    const [dataServicios, setDataServicios] = useState([]);

    const [dataPuntos, setDataPuntos] = useState([]);
    const [dataPuntosT, setDataPuntosT] = useState([]);
    const position = [4.570868, -74.297333];
    const [showResults, setShowResults] = useState(false);
    const [showFiltros, setShowFiltros] = useState(false);
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

                let array = [];
                uniqueEstados.map((item) => {
                    let array2 = {};
                    array2.value = item;
                    array2.label = item;
                    array.push(array2)
                });

                setEstadosMap(array.sort(function (a, b) {
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






            value = array
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

    return (

        <>
            <div>
                <MapContainer style={{ position: 'fixed' }} center={position} zoom={6} scrollWheelZoom={false} id="map">
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