import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import DetalleServiciosImagen from './DetalleServiciosImagen';
import 'leaflet/dist/leaflet.css';
import TarjetaDetallePunto from './TarjetaDetallePunto';
import Select from 'react-select';
import AuthContext from '../authContext';
import {
    Container, Row, Col, Image, Card, Figure, FormGroup,
    FormControl, InputGroup, Input, Table,
    Button, Modal
} from 'react-bootstrap';

const PuntosServicio = (props) => {
    const [dataServicios, setDataServicios] = useState([]);
    const { getConfig } = useContext(AuthContext)
    const [dataPuntos, setDataPuntos] = useState([]);
    const [dataPuntosT, setDataPuntosT] = useState([]);
    const position = [4.570868, -74.297333];
    const [showResults, setShowResults] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [showFiltros, setShowFiltros] = useState(true);
    const [showFiltrosM, setShowFiltrosM] = useState(false);
    const [dataPunto, setDataPunto] = useState({})
    const [departamentosMap, setDepartamentosMap] = useState([]);
    const [municipiosMap, setMunicipiosMap] = useState([]);
    const [estadosMap, setEstadosMap] = useState([]);
    const [selectDepart, setSelectDepart] = useState("");
    const [selectMuni, setSelectMuni] = useState("");
    const [selectEstado, setSelectEstado] = useState("");
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    const [apiMaps, setApiMaps] = useState("");
    const [activeVisible, setActiveVisible] = useState("")
    const [estadoTexto, setEstadoTexto] = useState("")
    const [estadoTipo, setEstadoTipo] = useState("")
    const [apiServicios, setApiServicios] = useState("");
    const [apiEstados, setApiEstados] = useState("");
    const [estadosDMap, setEstadosDMap] = useState([])
    const iconoDefecto = "https://mapeo-de-servicios.gifmm-colombia.site/sites/default/files/iconos/estados-punto/iconos_estado_servicios-18_0.png"

    useEffect(() => {
        getConfig().then((config) => {
            setApiMaps(config.apiMapeo)
            setActiveVisible(config.activeVisible)
            setEstadoTexto(config.activeStates)
            setEstadoTipo(config.activeType)
            setApiServicios(config.apiMapeoServicios)
            setApiEstados(config.apiMapeoEstados)


            getPuntos();
        });

    }, [apiMaps, activeVisible, estadoTexto, estadoTipo, apiServicios, apiEstados]);


    const getPuntos = () => {



        DataService.getAllMapas(props.apiMapeo)
            .then(response => {


                setDataPuntos(response.data);
                setDataPuntosT(response.data)

                getServicios();
                getEstados();

                const value = response.data.filter(function (item) {
                    const textVisible = item.Visible_publico;
                    const textState = item.Estado_id;
                    const textType = item.Tipo_ubicacion;



                    return (props.estadoTextoP.indexOf(textState) > -1 && props.estadoTipoP.indexOf(textType) > -1 && props.activeVisibleP.indexOf(textVisible) > -1);

                })


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












    }

    const getEstados = () => {

        DataService.getAllEstados(apiEstados)
            .then(response => {


                setEstadosDMap(response.data)

            })
            .catch(e => {

            });
    }

    const getEstado = (idEstado) => {


        var service = estadosDMap && estadosDMap.find((element) => {
            return element.id_estado === idEstado;
        })
        return service;
    }



    const getServicios = () => {
        DataService.getAllServicios(apiServicios).then(response => {


            var arr = [];
            response.data.map(index => {

                arr.push({ name: index.servicio, label: index.servicio, value: index.id_servicio, img_servicio: index.img_servicio });

            })
            setDataServicios(arr)
        })
            .catch(e => {

            });
    }


    const handleChange = (event) => {
        // updating an object instead of a Map
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }







    const consultarPunto = (item) => {
        console.log(item)
        setDataPunto(item)
        setShowResults(true)
        setShowGrid(false);
        setShowFiltros(true)

    }

    const cerrarModal = () => {

        setDataPunto({})
        setShowResults(false)
    }

    const handleChangeDepart = (selectDepart) => {

        setSelectMuni("");
        if (selectDepart.value !== undefined) {
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

    const filtrarServiciosMobile = () => {

        setShowFiltros(true);

    }

    const filtrarServicios = () => {

        setShowFiltros(false);
        setShowFiltrosM(false)
setMostrarModal(true)
        setShowGrid(true);

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

    const filtrarServiciosM = () => {

        setShowFiltros(false);
        setShowFiltrosM(false)
        setMostrarModal(false);
        setShowGrid(true);

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
        setShowGrid(false);
        setShowFiltrosM(false);
        setDataPuntosT(dataPuntos);

    }

    const volverFiltro = () => {

        setSelectDepart("");
        setSelectMuni("");
        setSelectEstado("");
        setCheckedItems({})
        setShowFiltros(true);
        setShowFiltrosM(false)
        setShowGrid(false)
        setDataPuntosT(dataPuntos);

    }

    const comoLlegar = (item) => {

        let coor = item.split(",");
        let latitude = parseFloat(coor[0]);
        let longitude = parseFloat(coor[1]);

        window.open("https://maps.google.com/?q=" + latitude + "," + longitude, '_blank');

    }

    return (

        <Container fluid style={{ margin: '0', padding: '0' }}>
            

            <Row className='listado-lineas'>

                <Col sm={12} lg={!showFiltros ? 4 : 8} md={12} xs={12}>

                    <MapContainer style={{ position: 'relative', width: '100%', zIndex: '50' }} center={position} zoom={7} scrollWheelZoom={false} id="map">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {dataPuntosT.map((statistic, index) => {

                            const textVisible = statistic.Visible_publico;
                            const textState = statistic.Estado_id;
                            const textType = statistic.Tipo_ubicacion;
                            if (estadoTexto.indexOf(textState) > -1 && estadoTipo.indexOf(textType) > -1 && activeVisible.indexOf(textVisible) > -1) {

                                let estado = getEstado(statistic.Estado_id)


                                if (statistic.Coordenadas !== "") {
                                    let coor = statistic.Coordenadas.split(",");
                                    let latitude = parseFloat(coor[0]);
                                    let longitude = parseFloat(coor[1]);
                                    return (
                                        <Marker key={index} position={[latitude, longitude]} icon={new Icon({ iconUrl: estado !== undefined ? estado?.img_estado_b64 : iconoDefecto, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                            eventHandlers={{
                                                click: () => {
                                                    consultarPunto(statistic);
                                                },
                                            }}
                                        >

                                        </Marker>
                                    )
                                }
                            }
                        })}
                    </MapContainer>



                </Col>
                {!showFiltrosM && !showGrid ?
                    <Col md={{ span: 4, offset: 3 }} sm={{ span: 4, offset: 3 }} xs={{ span: 4, offset: 3 }} className='d-lg-none  text-center align-items-center filtro-linea' >
                        <Button size="xxl" variant='boton-filtro-linea' onClick={() => setShowFiltrosM(true)}>
                            Filtrar puntos de servicio
                        </Button>
                    </Col>
                    : null}
                {showFiltros ?
                    <Col sm={12} lg={4} md={12} xs={12} className="d-none d-lg-block">
                        <Card >
                            <Card.Title className='text-center card-tel-title'>
                                Filtrar puntos de servicio
                            </Card.Title>

                            <Card.Body>
                                <Select width='200px' options={departamentosMap} value={selectDepart} placeholder="Seleccione" defaultValue={""}

                                    className="select-custom-class" onChange={handleChangeDepart} />
                                <Select options={municipiosMap} value={selectMuni} placeholder="Seleccione"
                                    className="select-custom-class" onChange={handleChangeMuni} />
                                <Select options={estadosMap} value={selectEstado} placeholder="Seleccione"
                                    className="select-custom-class" onChange={handleChangeEstados} />
                            </Card.Body>
                            <Card.Body style={{
                                maxHeight: 'calc(50vh - 210px)',
                                overflowY: 'scroll'
                            }}>
                                <Card.Subtitle className='text-left mb-1'>Tipos de servicio</Card.Subtitle>

                                <Table striped bordered hover>
                                    <tbody>
                                        {
                                            dataServicios.map(item => (
                                                <tr>
                                                    <td key={item.key}>
                                                        <img width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site' + item?.img_servicio} />
                                                        <label className='filtro-label-3' key={item.key}>
                                                            {item.name}

                                                        </label>
                                                    </td>
                                                    <td>
                                                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                                    </td>
                                                </tr>
                                            ))
                                        }


                                    </tbody>
                                </Table>



                            </Card.Body>
                            <Card.Body>
                                <div className='text-center align-items-center d-flex justify-content-around p-2'>
                                    <Button size="xxl" variant="boton-borrar" onClick={() => borrarFiltros()}>Borrar</Button>
                                    <Button size="xxl" variant="boton-buscar" onClick={() => filtrarServicios()}>Filtrar</Button>

                                </div>
                            </Card.Body>

                        </Card>




                    </Col>
                    : null}

                {showFiltrosM ?
                    <Col sm={12} lg={4} md={12} xs={12} className="d-lg-none position-absolute filtro-absoluto">
                        <Card >
                            <Card.Title className='text-center card-tel-title'>
                                Filtrar puntos de servicio
                            </Card.Title>

                            <Card.Body>
                                <Select width='200px' options={departamentosMap} value={selectDepart} placeholder="Seleccione" defaultValue={""}

                                    className="select-custom-class" onChange={handleChangeDepart} />
                                <Select options={municipiosMap} value={selectMuni} placeholder="Seleccione"
                                    className="select-custom-class" onChange={handleChangeMuni} />
                                <Select options={estadosMap} value={selectEstado} placeholder="Seleccione"
                                    className="select-custom-class" onChange={handleChangeEstados} />
                            </Card.Body>
                            <Card.Body style={{
                                maxHeight: 'calc(50vh)',
                                overflowY: 'scroll'
                            }}>
                                <Card.Subtitle className='text-left mb-1'>Tipos de servicio</Card.Subtitle>

                                <Table striped bordered hover>
                                    <tbody>
                                        {
                                            dataServicios.map(item => (
                                                <tr>
                                                    <td key={item.key}>
                                                        <img width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site' + item?.img_servicio} />
                                                        <label className='filtro-label-3' key={item.key}>
                                                            {item.name}

                                                        </label>
                                                    </td>
                                                    <td>
                                                        <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                                    </td>
                                                </tr>
                                            ))
                                        }


                                    </tbody>
                                </Table>



                            </Card.Body>
                            <Card.Body>
                                <div className='text-center align-items-center d-flex justify-content-around p-2'>
                                    <Button size="xxl" variant="boton-borrar" onClick={() => borrarFiltros()}>Borrar</Button>
                                    <Button size="xxl" variant="boton-buscar" onClick={() => filtrarServiciosM()}>Filtrar</Button>

                                </div>
                            </Card.Body>

                        </Card>




                    </Col>
                    : null}

                {showGrid ?
                    <Col sm={12} lg={8} md={12} xs={12} className="grid-absolute" style={{
                        maxHeight: 'calc(80vh - 210px)',
                        overflowY: 'scroll'

                    }}>
                        <Card >
                            <Card.Title>
                                <Row>
                                    <Col className='col-1'>
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 18.9L13.95 13.95C14.9289 12.971 15.5955 11.7237 15.8656 10.3659C16.1356 9.00801 15.9969 7.60058 15.4671 6.32154C14.9373 5.0425 14.04 3.94929 12.8889 3.18015C11.7378 2.41101 10.3844 2.00049 9 2.00049C7.61557 2.00049 6.26222 2.41101 5.11109 3.18015C3.95996 3.94929 3.06275 5.0425 2.53292 6.32154C2.00308 7.60058 1.86442 9.00801 2.13445 10.3659C2.40449 11.7237 3.07111 12.971 4.05 13.95L9 18.9ZM9 21.728L2.636 15.364C1.37734 14.1053 0.520187 12.5017 0.172928 10.7558C-0.17433 9.01001 0.00390685 7.20041 0.685099 5.55588C1.36629 3.91136 2.51984 2.50575 3.99988 1.51683C5.47992 0.527899 7.21998 6.10352e-05 9 6.10352e-05C10.78 6.10352e-05 12.5201 0.527899 14.0001 1.51683C15.4802 2.50575 16.6337 3.91136 17.3149 5.55588C17.9961 7.20041 18.1743 9.01001 17.8271 10.7558C17.4798 12.5017 16.6227 14.1053 15.364 15.364L9 21.728ZM9 11C9.53044 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53042 11 8.99998C11 8.46955 10.7893 7.96084 10.4142 7.58577C10.0391 7.2107 9.53044 6.99998 9 6.99998C8.46957 6.99998 7.96086 7.2107 7.58579 7.58577C7.21072 7.96084 7 8.46955 7 8.99998C7 9.53042 7.21072 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11ZM9 13C7.93914 13 6.92172 12.5786 6.17158 11.8284C5.42143 11.0783 5 10.0608 5 8.99998C5 7.93912 5.42143 6.9217 6.17158 6.17156C6.92172 5.42141 7.93914 4.99998 9 4.99998C10.0609 4.99998 11.0783 5.42141 11.8284 6.17156C12.5786 6.9217 13 7.93912 13 8.99998C13 10.0608 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13Z" fill="#003031" />
                                </svg>
                                </Col>
                                <Col><label className='result-label-1'>{selectDepart.value} - {selectMuni.value} - {selectEstado.value}  </label></Col>
                                <Col><label onClick={() => volverFiltro()} className='result-label-2'>Volver a Filtrar</label></Col>
                                </Row>
                            </Card.Title>
                        </Card>
                        <Row className="text-center align-items-center mb-1">
                            {dataPuntosT != undefined && dataPuntosT.map((item, i) => {
                                let estadoA = getEstado(item.Estado_id);

                                const textVisible = item.Visible_publico;
                                const textState = item.Estado_id;
                                const textType = item.Tipo_ubicacion;
                                if (estadoTexto.indexOf(textState) > -1 && estadoTipo.indexOf(textType) > -1 && activeVisible.indexOf(textVisible) > -1) {

                                    return (

                                        <Col sm={12} lg={6} md={12} xs={12} key={i} style={{ padding: '10px' }} className="grid-resultados">

                                            <Card style={{ padding: '10px' }}>
                                                <Card.Title className='result-label-title' >{item.Nombre_punto}</Card.Title>

                                                <Card.Body>
                                                    <Col>
                                                        <Row>
                                                            {item.Servicios !== undefined && item.Servicios.map((l, i) => (
                                                                <DetalleServiciosImagen puntoServicios={l} apiServicios={apiServicios} />

                                                            ))}
                                                        </Row>
                                                        <Row>
                                                            <img alt="img_servicio" height={23} src={estadoA?.img_estado_b64} /><label className='result-label-4'>
                                                                {item.Estado}
                                                            </label>
                                                        </Row>
                                                        <Row>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.00008 17.3333C4.39758 17.3333 0.666748 13.6025 0.666748 8.99999C0.666748 4.39749 4.39758 0.666656 9.00008 0.666656C13.6026 0.666656 17.3334 4.39749 17.3334 8.99999C17.3334 13.6025 13.6026 17.3333 9.00008 17.3333ZM9.83342 8.99999V4.83332H8.16675V10.6667H13.1667V8.99999H9.83342Z" fill="#425565" />
                                                            </svg>
                                                            <label className='result-label-4'>
                                                                8:00am - 5:00pm
                                                            </label>
                                                        </Row>

                                                        <Button size="xxl" variant="boton-borrar" onClick={() => consultarPunto(item)}>Ver Mas</Button>
                                                        <Button size="xxl" variant="boton-buscar" onClick={() => comoLlegar(item.Coordenadas)}>Como llegar</Button>

                                                    </Col>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                    )
                                }
                            })}
                        </Row>
                    </Col>



                    : null
                }
                {showResults ?
                    <Col sm={12} lg={4} md={12} xs={12} style={{ height: '75vh', overflowY: 'scroll', padding: '0', margin: '0', zIndex: 450 }} className="d-lg-none position-absolute">
                        <Card style={{ height: '75vh', overflowY: 'scroll', padding: '0', margin: '0', border: '0' }}>
                            <Card.Title className='text-center card-tel-title'>
                                <Row>
                                    <Col className='col-1'>
                                <svg onClick={() => cerrarModal()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" fill="#003031" />
                                </svg>
                                </Col>
                                <Col>
                                <label className='info-title'>Informacion de punto</label>
                                </Col>
                                
                                </Row>
                            </Card.Title>
                            <Card.Body style={{ padding: '2rem', height:'80vh' }}>
                                <TarjetaDetallePunto item={dataPunto} />
                            </Card.Body>
                        </Card>
                    </Col>

                    : null}
                {showResults ?
                    <Modal show={mostrarModal} onHide={cerrarModal} className='right fade d-none d-lg-block'>
                        <Modal.Header closeButton>
                            <Modal.Title><label className='info-title'>Informacion de punto</label></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card style={{ height: '75vh', overflowY: 'scroll', padding: '0', margin: '0', border: '0' }}>
                                <Card.Body style={{ padding: '1rem' }}>
                                    <TarjetaDetallePunto item={dataPunto} />
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                    </Modal>
                    : null}
            </Row>
        </Container>

    );
}
export default PuntosServicio;