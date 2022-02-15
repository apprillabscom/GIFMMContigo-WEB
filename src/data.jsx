import http from "./axios";
import React, { useState, useEffect, useContext } from 'react';



const getAllLineasTelefonicas = (api) => {

    return http.get(api);
};

const getAllServiciosTel = (api) => {

    console.log(api)
    return http.get(api);
};

const getAllMapas = (api) => {

    
    return http.get(api);   
    
    
};

const getAllServicios = (api) => {

    
    return http.get(api);   
    
    
};

export default {
    getAllLineasTelefonicas,
    getAllMapas,
    getAllServicios,
    getAllServiciosTel
};