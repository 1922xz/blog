import axios from 'axios'
const service=axios.create({
    baseURL:'http://localhost:3008',
})

service.interceptors.request.use(
    config=>{
        let token=localStorage.getItem('token');
        if(token&&token!==""){
            config.headers.common['authorization'] = token
        }
        return config
    },
    error=>Promise.reject(error)
)
service.interceptors.response.use(
    response=>{
        console.log(response);
        if(response.status==200){
            return response.data||true
        }else{
            return response.message
        }
    },
    error=>{
        Promise.reject(error)
    }
)

export default service