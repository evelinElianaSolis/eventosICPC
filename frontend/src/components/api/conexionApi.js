import axios from 'axios';

const conexionAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export default conexionAPI;
