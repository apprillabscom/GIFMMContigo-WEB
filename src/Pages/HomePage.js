import React, { useEffect, useState, useContext } from "react";
import app from '../Firebase/firebase.config'
import LineasTelefonicas from "./LineasTelefonicas";
import PuntosServicio from "./PuntosServicio";
import './estilos.css'
import logo from '../recursos/logoHeader.png';
import AuthContext from '../authContext';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
const Homepage = () => {
  const { getConfig } = useContext(AuthContext)

  const [openLineas, setOpenLineas] = useState(false);
  const [openPuntos, setOpenPuntos] = useState(true);
  const [apiMaps, setApiMaps] = useState("");
  const [activeVisible, setActiveVisible] = useState("")
  const [estadoTexto, setEstadoTexto] = useState("")
  const [estadoTipo, setEstadoTipo] = useState("")
  const [apiServicios, setApiServicios] = useState("");

  const abrirMenuLineas = () => {
    
    setOpenPuntos(false);
    setOpenLineas(true)
  }

  const abrirMenuPuntos = () => {
    setOpenPuntos(true);
    setOpenLineas(false)
  }

  useEffect(() => {
    let i = 0;
    getConfig().then((config) => {
        setActiveVisible(config.activeVisible)
        setEstadoTexto(config.activeStates)
        setEstadoTipo(config.activeType)
       

       
    });

}, [ activeVisible, estadoTexto, estadoTipo]);
  
  return (
    <div className="contenedor-maximo">
    <div style={{ display: 'flex', flexDirection: 'column'}} >

      <div className="header">

        <div className="headerFlex">
          {!openLineas ?
            <div className="headerFlex-1">
              <span className="headerTitle">Mapeo de Servicios Colombia</span>
            </div>
            : <div className="headerFlex-1">
              <span className="headerTitle">Lineas telefonicas</span>
            </div>
          }
          <div className="logoHeader">
            <img src={logo} alt="Logo" className="logoHeaderImg" />
          </div>

        </div>


      </div>
      <div className="divMenu">

        <div className="tabmenu1" onClick={() => abrirMenuPuntos()}>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18.9L13.95 13.95C14.9289 12.971 15.5955 11.7237 15.8656 10.3659C16.1356 9.00801 15.9969 7.60058 15.4671 6.32154C14.9373 5.0425 14.04 3.94929 12.8889 3.18015C11.7378 2.41101 10.3844 2.00049 9 2.00049C7.61557 2.00049 6.26222 2.41101 5.11109 3.18015C3.95996 3.94929 3.06275 5.0425 2.53292 6.32154C2.00308 7.60058 1.86442 9.00801 2.13445 10.3659C2.40449 11.7237 3.07111 12.971 4.05 13.95L9 18.9ZM9 21.728L2.636 15.364C1.37734 14.1053 0.520187 12.5017 0.172928 10.7558C-0.17433 9.01001 0.00390685 7.20041 0.685099 5.55588C1.36629 3.91136 2.51984 2.50575 3.99988 1.51683C5.47992 0.527899 7.21998 6.10352e-05 9 6.10352e-05C10.78 6.10352e-05 12.5201 0.527899 14.0001 1.51683C15.4802 2.50575 16.6337 3.91136 17.3149 5.55588C17.9961 7.20041 18.1743 9.01001 17.8271 10.7558C17.4798 12.5017 16.6227 14.1053 15.364 15.364L9 21.728ZM9 11C9.53044 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0391 11 9.53042 11 8.99998C11 8.46955 10.7893 7.96084 10.4142 7.58577C10.0391 7.2107 9.53044 6.99998 9 6.99998C8.46957 6.99998 7.96086 7.2107 7.58579 7.58577C7.21072 7.96084 7 8.46955 7 8.99998C7 9.53042 7.21072 10.0391 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11ZM9 13C7.93914 13 6.92172 12.5786 6.17158 11.8284C5.42143 11.0783 5 10.0608 5 8.99998C5 7.93912 5.42143 6.9217 6.17158 6.17156C6.92172 5.42141 7.93914 4.99998 9 4.99998C10.0609 4.99998 11.0783 5.42141 11.8284 6.17156C12.5786 6.9217 13 7.93912 13 8.99998C13 10.0608 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13Z" fill="#003031" />
          </svg>

          <p className="menuTexto">Puntos de servicio</p>
        </div>
        <div className="tabmenu2" onClick={() => abrirMenuLineas()}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.366 7.682C7.30434 9.33048 8.66952 10.6957 10.318 11.634L11.202 10.396C11.3442 10.1969 11.5543 10.0569 11.7928 10.0023C12.0313 9.94779 12.2814 9.98254 12.496 10.1C13.9103 10.8729 15.4722 11.3378 17.079 11.464C17.3298 11.4839 17.5638 11.5975 17.7345 11.7823C17.9052 11.9671 18 12.2094 18 12.461V16.923C18.0001 17.1706 17.9083 17.4094 17.7424 17.5932C17.5765 17.777 17.3483 17.8927 17.102 17.918C16.572 17.973 16.038 18 15.5 18C6.94 18 0 11.06 0 2.5C0 1.962 0.027 1.428 0.082 0.898C0.107255 0.651697 0.222984 0.423521 0.40679 0.257634C0.590595 0.0917472 0.829406 -5.33578e-05 1.077 2.32673e-08H5.539C5.79056 -3.15185e-05 6.0329 0.0947515 6.21768 0.265451C6.40247 0.43615 6.51613 0.670224 6.536 0.921C6.66222 2.52779 7.12708 4.08968 7.9 5.504C8.01746 5.71856 8.05221 5.96874 7.99767 6.2072C7.94312 6.44565 7.80306 6.65584 7.604 6.798L6.366 7.682ZM3.844 7.025L5.744 5.668C5.20478 4.50409 4.83535 3.26884 4.647 2H2.01C2.004 2.166 2.001 2.333 2.001 2.5C2 9.956 8.044 16 15.5 16C15.667 16 15.834 15.997 16 15.99V13.353C14.7312 13.1646 13.4959 12.7952 12.332 12.256L10.975 14.156C10.4287 13.9437 9.89801 13.6931 9.387 13.406L9.329 13.373C7.36758 12.2567 5.74328 10.6324 4.627 8.671L4.594 8.613C4.30691 8.10199 4.05628 7.57134 3.844 7.025Z" fill="#003031" />
          </svg>

          <p className="menuTexto">Lineas telefonicas</p>
        </div>

      </div>
      <div className="bodyDiv">
        {openLineas ?
          <LineasTelefonicas />
          : null}
        {openPuntos ?
          <PuntosServicio activeVisibleP={activeVisible} estadoTextoP={estadoTexto} estadoTipoP={estadoTipo} />
          : null}
      </div>


    </div>
    </div>
  );
};

export default Homepage;
