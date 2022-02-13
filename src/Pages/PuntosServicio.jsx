import React, { useState, useEffect, useContext } from 'react';
import DataService from "../data";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import AuthContext from '../authContext';
import 'leaflet/dist/leaflet.css';
import TarjetaDetallePunto from './TarjetaDetallePunto';

const PuntosServicio = () => {
    const { getConfig } = useContext(AuthContext)
    const [apiMaps, setApiMaps] = useState("");
    const [dataPuntos, setDataPuntos] = useState([]);
    const [dataPuntosT, setDataPuntosT] = useState([]);
    const position = [4.570868, -74.297333];
    const [showResults, setShowResults] = useState(false);
    const [showFiltros, setShowFiltros] = useState(false);
    const [dataPunto, setDataPunto] = useState({})
    const [activeVisible, setActiveVisible] = useState("")
    const [estadoTexto, setEstadoTexto] = useState("")
    const [estadoTipo, setEstadoTipo] = useState("")
    const [departamentosMap, setDepartamentosMap] = useState([]);

    useEffect(() => {
        let i = 0;
        getConfig().then((config) => {
            setApiMaps(config.apiMapeo)
            setActiveVisible(config.activeVisible)
            setEstadoTexto(config.activeStates)
            setEstadoTipo(config.activeType)


            getMaps()
            getDepartamentos();


        });


    }, [apiMaps, activeVisible, estadoTexto, estadoTipo, dataPuntosT]);

    const getMaps = () => {

        DataService.getAllMapas(apiMaps, activeVisible, estadoTexto, estadoTipo)
            .then(response => {

                const value = response.data.filter(function (item) {
                    const textVisible = item.Visible_publico;
                    const textState = item.Estado_id;
                    const textType = item.Tipo_ubicacion;



                    return (estadoTexto.indexOf(textState) > -1 && estadoTipo.indexOf(textType) > -1 && activeVisible.indexOf(textVisible) > -1);

                })
                setDataPuntos(value);
                setDataPuntosT(dataPuntos)

            })
            .catch(e => {
                console.log(e);
            });
    };

    const getDepartamentos = () => {

        const uniqueDepartametos = [new Set(dataPuntos.map((item) => item.Departamento))];
        setDepartamentosMap(uniqueDepartametos);

    }


    const consultarPunto = (item) => {

        setShowResults(true)
        setDataPunto(item)
    }

    const cerrarModal = () => {

        setDataPunto({})
        setShowResults(false)
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
                    <div className='filtro-div-2'>
                        <label className='filtro-label-1'>
                            Filtrar puntos de servicio
                        </label>
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