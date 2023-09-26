import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
        // 'Authorization': localStorage.getItem('userInfo') ?
        //     `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` : '',
    }
});

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        req.headers['Authorization'] = 'Bearer ' + JSON.parse(userInfo).token;
        // req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
    }

    return req;
})

export default API;