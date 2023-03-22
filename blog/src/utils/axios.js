import axios from "axios";
const service = axios.create({
    baseURL: 'http://localhost:3008',
    timeout: 1000
})

service.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');
        if (token && token !== "") {
            config.headers.common['authorization'] = token
        }
        return config
    },
    error => { return Promise.reject(error) }
)

service.interceptors.response.use(
    response => {
        console.log(response);
        return response.data.data
    },
    error => { return Promise.reject(error) }
)

export default service