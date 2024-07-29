// src/api/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3025",
});

export default api;
