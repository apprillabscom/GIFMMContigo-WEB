import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../authContext';
import DataService from "../data";
import { Card, Button, Col, Row } from 'react-bootstrap';

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





    }, [apiServicios, getConfig, item.puntoServicios]);

    const getApiMapeo = () => {

        DataService.getAllServicios(apiServicios)
            .then(response => {

                var service = response.data.find((element) => {
                    return element.id_servicio === puntoServicio.Servicio_id;
                })

                setImagenServicio(service)

            })
            .catch(e => {

            });







    };


    return (

        <Card>
            <Row >
                <Col className="col-2">
                    <img alt="img_serv" width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site' + imagenServicio?.img_servicio} />
                </Col>
                <Col>
                    <Row><label className='service-label-1'>{puntoServicio.Servicio}</label></Row>
                    <Row style={{margin:'0'}}><label className='service-label-2'>{puntoServicio.Descripcion_Servicio}</label></Row>
            <Row> <label className='service-label-3'>Organización(es) principal(es)</label></Row>
            <Row><label className='service-label-4'>{puntoServicio.Organizacion_es}</label></Row>
                </Col>
            </Row>
            
        </Card>
    )




}
export default DetalleServicios;