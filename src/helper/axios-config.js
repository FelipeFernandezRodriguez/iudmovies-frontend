import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://iudmovies-backend.onrender.com/'
});

export{
    axiosInstance,
}