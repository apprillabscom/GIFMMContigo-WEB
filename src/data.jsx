import http from "./axios";



const getAllLineasTelefonicas = (api) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)


};

const getAllServiciosTel = (api) => {


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)
};

const getAllMapas = (api) => {


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)


};

const getAllServicios = (api) => {


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)


};

const getAllEstados = (api) => {


    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(api, requestOptions)


};



export default {
    getAllLineasTelefonicas,
    getAllMapas,
    getAllServicios,
    getAllServiciosTel,
    getAllEstados
};