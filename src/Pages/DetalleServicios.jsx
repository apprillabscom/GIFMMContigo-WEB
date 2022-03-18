import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../authContext';

import { Card, Button, Col, Row } from 'react-bootstrap';

const DetalleServicios = (item) => {

    const { getConfig } = useContext(AuthContext)
    const [apiServicios, setApiServicios] = useState("");
    const [apiBase, setApiBase] = useState("");
    const [detaServicio, setDetaServicio] = useState("");
    const [puntoServicio, setPuntoServicio] = useState({})

    useEffect(() => {

        getConfig().then((config) => {
            setApiServicios(config.apiMapeoServicios)
            setApiBase(config.apiBaseURL);


        });


        setPuntoServicio(item.puntoServicios)

        getApiMapeo();





    }, [apiBase,apiServicios, getConfig, item.puntoServicios]);

    const getApiMapeo = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        await fetch(apiBase+''+apiServicios,requestOptions)
            .then(response => response.json())
            .then(data => {
                

                var service = data.find((element) => {
                    return element.id_servicio === puntoServicio.Servicio_id;
                })

                setDetaServicio(service)

            })
            .catch(e => {

            });







    };


    return (
        <>
            {detaServicio.visibilidad_servicio === "SI" ?
                <Card className='mb-3'>
                    <Row >
                        <Col className="col-2">
                            <img alt="img_serv" width={23} height={23} src={'https://mapeo-de-servicios.gifmm-colombia.site' + detaServicio?.img_servicio} />
                        </Col>
                        <Col>
                            <Row><label className='service-label-1'>{puntoServicio.Servicio}</label></Row>
                            <Row style={{ margin: '0' }}><label className='service-label-2'>{puntoServicio.Descripcion_Servicio}</label></Row>
                            <Row> <label className='service-label-3'>Organización(es) principal(es)</label></Row>
                            <Row><label className='service-label-4'>{puntoServicio.Organizacion_es}</label></Row>
                        </Col>
                    </Row>

                </Card>
                : null}
        </>
    )




}
export default DetalleServicios;