import { axiosInstance } from '../helper/axios-config';

const obtenerTipo = () => {
    return axiosInstance.get('tipo', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const editarTipo = (tipoId, data) => {
    return axiosInstance.put(`tipo/${tipoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const obtenerTipoPorId = (tipoId) => {
    return axiosInstance.get(`tipo/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export{
    obtenerTipo, crearTipo, editarTipo, obtenerTipoPorId
}