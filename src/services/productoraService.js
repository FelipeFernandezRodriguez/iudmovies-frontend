import { axiosInstance } from '../helper/axios-config';

const obtenerProductora = () => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const obtenerProductoraPorId = (productoraId) => {
    return axiosInstance.get(`productora/${productoraId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export{
    obtenerProductora, crearProductora, editarProductora, obtenerProductoraPorId
}