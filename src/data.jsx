import http from "./axios";



const getAllLineasTelefonicas = (api) => {
    
    return http.get(api);
};

const getAllServiciosTel = (api) => {

    
    return http.get(api);
};

const getAllMapas = (api) => {

    
    return http.get(api);   
    
    
};

const getAllServicios = (api) => {

    
    return http.get(api);   
    
    
};

const getAllEstados = (api) => {

    
    return http.get(api);   
    
    
};



export default {
    getAllLineasTelefonicas,
    getAllMapas,
    getAllServicios,
    getAllServiciosTel,
    getAllEstados
};