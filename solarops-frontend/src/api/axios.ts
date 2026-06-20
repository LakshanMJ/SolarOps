// import axios from 'axios'
// export const api = axios.create({
//     baseURL: 'http://localhost:4000/api',
//     timeout: 10000,
// })


import axios from 'axios'

// Checks if a live environment variable exists, otherwise falls back to localhost for your machine
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:4000/api';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
})