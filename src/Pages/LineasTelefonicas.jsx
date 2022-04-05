import React, { useState, useEffect, useContext } from 'react';

import Select from 'react-select';
import AuthContext from '../authContext';
import DetalleDirectorio from './DetalleDirectorio';
import {
    Container, Row, Col, Image, Card, Figure, FormGroup,
    FormControl, InputGroup, Input, Table,
    Button, Modal
} from 'react-bootstrap';


const LineasTelefonicas = () => {
    const { getConfig } = useContext(AuthContext)
    const [apiDirectory, setApiDirectory] = useState("");
    const [apiBase, setApiBase] = useState("");
    const [apiLineasTelefonicasServicios, setApiLineasTelefonicasServicios] = useState("");
    const [dataLineas, setDataLineas] = useState([]);
    const [dataLineasTel, setDataLineasTel] = useState([]);
    const [dataLineasT, setDataLineasT] = useState([]);
    const [showData, setShowData] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [showFiltros, setShowFiltros] = useState(false);
    const [dataLinea, setDataLinea] = useState({})
    const [checkedItems, setCheckedItems] = useState({}); //plain object as state
    const [departamentosMap, setDepartamentosMap] = useState([]);
    const [selectDepart, setSelectDepart] = useState("");
    const [showFiltrosM, setShowFiltrosM] = useState(true);

    useEffect(() => {
        getConfig().then((config) => {
            setApiDirectory(config.apiLineasTelefonicas)
            setApiLineasTelefonicasServicios(config.apiLineasTelefonicasServicios)
            setApiBase(config.apiBaseURL)
            getLineasTelefonicas()
            getServicios();

        });

    }, [apiBase,apiDirectory, apiLineasTelefonicasServicios]);



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
        if (apiDirectory !== undefined) {
            var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiBase+''+apiDirectory,requestOptions)
            .then(response => response.json())
            .then(data => {
                    setDataLineas(data);

                    setDataLineasT(data.sort(function (a, b) {
                        return compareObjects(a, b, 'departamento')
                    }))

                    const uniqueDepartametos = Array.from(new Set(data.map((item) => item.departamento)));

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
                    console.log("No se pudo consultar el api");
                });
        }

    };

    const handleChangeDepart = (selectDepart) => {
        setSelectDepart(selectDepart)
    }

    const getServicios = async () => {
        
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(apiBase+''+apiLineasTelefonicasServicios,requestOptions)
            .then(response => response.json())
            .then(data => {
               
                var arr = [];
                data.map(index => {

                    arr.push({ name: index.nombre, label: index.nombre, value: index.id });

                })
                setDataLineasTel(arr)


            })
            .catch(e => {
                console.log("No se pudo consultar el api");
            });


    };

    const consultarDepartamento = (item) => {


        setDataLinea(item);
        setShowResults(true)
        //setShowData(false)
    }

    const cerrarModal = () => {


        setDataLinea({});
        setShowResults(false)
        setShowData(true)
    }

    const buscar = (event) => {



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
        setShowFiltrosM(true);
        setShowData(true);


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
        let depaFiltro = selectDepart.value;

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

            value = array3.filter((item) => {
                if (depaFiltro !== undefined) {
                    if (item.departamento !== undefined) {
                        return item.departamento.toLowerCase() === depaFiltro.toLowerCase()
                    }
                } else {
                    return item;
                }
            })

        } else {
            value = dataLineas.filter((item) => {
                if (depaFiltro !== undefined) {
                    if (item.departamento !== undefined) {
                        return item.departamento.toLowerCase() === depaFiltro.toLowerCase()
                    }
                } else {
                    return item;
                }
            })
        }

        setDataLineasT(value);
        setShowFiltrosM(true);
        setShowData(true);

    }
    const borrarFiltros = () => {
        setShowFiltros(false)
        setCheckedItems({})
        setSelectDepart("");
        setShowData(true);
        setShowFiltrosM(true);
        setShowResults(false);
        setDataLineasT(dataLineas);
    }

    const cambiarFiltrosM = () => {
        setShowFiltrosM(false);
        setShowData(false);
    }


    return (
        <Container fluid style={{ margin: '0', padding: '0' }}>

            <h3 className='mb-3'>Lineas Telefonicas</h3>
            <Row className='listado-lineas'>

                {showFiltrosM && showData ?
                    <Col sm={12} lg={8} md={12} xs={12}>
                        <Row className="text-center align-items-center mb-1">
                            {dataLineasT != undefined && dataLineasT.map((item, i) => (
                                <Col sm={6} lg={6} md={6} xs={12} key={i} className="text-left divDetalleDepar" fluid onClick={() => consultarDepartamento(item)}>
                                    <Card sm={6} lg={6} md={6} xs={12} style={{ display: 'flex', flexDirection: 'row', width: '100%', cursor:'pointer' }} className="text-center itemDeparMobile">

                                        {item.icon.url !== undefined ?
                                            <Figure fluid>
                                                <Figure.Image className='image-tele'
                                                    src={item.icon.url}
                                                />
                                            </Figure>

                                            :
                                            null
                                        }

                                        <Card.Body className='label-telefonica'>{item.departamento.toLowerCase()}</Card.Body>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    : null}
                <Col sm={12} lg={4} md={12} xs={12} className="d-none d-lg-block">
                    <Card className='mt-1'>
                        <Card.Title className='text-center card-tel-title'>
                            Filtrar lineas telefonicas
                        </Card.Title>
                        <Card.Subtitle className='text-center card-tel-subtitle'>¡Usa la barra de búsqueda o busca por filtros!</Card.Subtitle>
                        <Card.Body>
                            <FormGroup>

                                <InputGroup>
                                    <FormControl
                                        placeholder="Buscar departamento o servicio"
                                        type="input"
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                buscar(event);
                                            }
                                        }}
                                    />
                                </InputGroup>

                            </FormGroup>
                        </Card.Body>
                        <Card.Body>
                            <Select width='200px' options={departamentosMap} value={selectDepart} placeholder="Seleccione"

                                className="select-custom-class" onChange={handleChangeDepart} />
                        </Card.Body>
                        <Card.Body style={{
                            maxHeight: 'calc(50vh - 210px)',
                            overflowY: 'auto'
                        }}>
                            <Card.Subtitle className='text-left'>Tipos de servicio</Card.Subtitle>

                            <Table striped bordered hover>
                                <tbody>
                                    {

                                        dataLineasTel.map((item, i) => (
                                            <tr>

                                                <td key={item.key}>
                                                    {item.name}

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
                {showData ?
                    <Col md={{ span: 4, offset: 3 }} sm={{ span: 4, offset: 3 }} xs={{ span: 4, offset: 3 }} className='d-lg-none  text-center align-items-center filtro-linea' >
                        <Button size="xxl" variant='boton-filtro-linea' onClick={() => cambiarFiltrosM()}>
                            Filtrar lineas
                        </Button>
                    </Col>
                    : null}
                {showResults ?
                    <Col sm={12} lg={4} md={12} xs={12} style={{ height: '75vh', overflowY: 'auto', padding: '0', margin: '0', zIndex: 450 }} className="d-lg-none position-fixed">
                        <Card style={{ height: '75vh', overflowY: 'auto', padding: '0', margin: '0' }}>
                            <Card.Title className='text-center card-tel-title'>
                                <svg onClick={() => cerrarModal()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" fill="#003031" />
                                </svg>
                                <label className='info-title'>{dataLinea.departamento.toLowerCase()}</label>
                                <div></div>
                            </Card.Title>
                            <Card.Body style={{ padding: '1rem' }}>
                                <DetalleDirectorio item={dataLinea.departamento} apiDirectory={apiDirectory} />
                            </Card.Body>
                        </Card>
                    </Col>

                    : null}
                {showResults ?

                    <Modal show={showResults} onHide={cerrarModal} className='right fade  d-none d-lg-block' id="myModal">
                        <Modal.Header closeButton>
                            <Modal.Title><label className='info-title'>{dataLinea.departamento.toLowerCase()}</label></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card style={{ height: '75vh', overflowY: 'auto', padding: '0', margin: '0' }}>
                                <Card.Body style={{ padding: '1rem' }}>
                                    <DetalleDirectorio item={dataLinea.departamento} apiDirectory={apiDirectory} apiBase={apiBase} />
                                </Card.Body>
                            </Card>

                        </Modal.Body>
                    </Modal>



                    : null}
                {!showFiltrosM ?

                    <Col sm={12} lg={4} md={12} xs={12} className="position-relative">
                        <Card className='mt-1'>
                            <Card.Title className='text-center card-tel-title'>
                                Filtrar lineas telefonicas
                            </Card.Title>
                            <Card.Subtitle className='text-center card-tel-subtitle'>¡Usa la barra de búsqueda o busca por filtros!</Card.Subtitle>
                            <Card.Body >
                                <FormGroup>

                                    <InputGroup>
                                        <FormControl
                                            placeholder="Buscar departamento o servicio"
                                            type="input"
                                            onKeyPress={event => {
                                                if (event.key === "Enter") {
                                                    buscar(event);
                                                }
                                            }}
                                        />
                                    </InputGroup>

                                </FormGroup>
                            </Card.Body>
                            <Card.Body>
                                <Select width='200px' options={departamentosMap} value={selectDepart} placeholder="Seleccione"

                                    className="select-custom-class" onChange={handleChangeDepart} />
                            </Card.Body>
                            <Card.Body style={{
                                maxHeight: 'calc(100vh - 210px)',
                                overflowY: 'auto'
                            }}>
                                <Card.Subtitle className='text-left'>Tipos de servicio</Card.Subtitle>

                                <Table style={{ height: '600px', overflowY: 'auto' }} striped bordered hover>

                                    {

                                        dataLineasTel.map((item, i) => (
                                            <tr>

                                                <td key={item.key}>
                                                    {item.name}

                                                </td>
                                                <td>
                                                    <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </Table>

                                <div className='text-center align-items-center d-flex justify-content-around p-2'>
                                    <Button size="xxl" variant="boton-borrar" onClick={() => borrarFiltros()}>Borrar</Button>
                                    <Button size="xxl" variant="boton-buscar" onClick={() => filtrarServicios()}>Filtrar</Button>

                                </div>

                            </Card.Body>
                        </Card>

                    </Col>
                    : null}
            </Row>





        </Container>
    );
}
export default LineasTelefonicas;