import { axiosInstance } from '../helper/axios-config';

const obtenerGenero = () => {
    return axiosInstance.get('genero', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearGenero = (data) => {
    return axiosInstance.post('genero', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarGenero = (generoId, data) => {
    return axiosInstance.put(`genero/${generoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const obtenerGeneroPorId = (generoId) => {
    return axiosInstance.get(`genero/${generoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export{
    obtenerGenero, crearGenero, editarGenero, obtenerGeneroPorId
}