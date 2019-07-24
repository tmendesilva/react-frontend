import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sagat-node-backend.herokuapp.com/'
});

export default api;
