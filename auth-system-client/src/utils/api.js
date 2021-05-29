import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_BACK_END,
    withCredentials: true,
    credentials: 'include'
})

export default API;