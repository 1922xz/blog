import axios from 'axios'
const service=axios.create({
    baseURL:'http://localhost:3008',
    // timeout:1000
})

service.interceptors.request.use(
    config=>{
        console.log(1);
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
        // console.log(response);
        // console.log(1);
        if(response.status==200){
            // console.log(1111);
            // console.log(response.data);
            return response.data||true
        }else{
            return response.message
        }
    },
    error=>Promise.reject(error)
)

export default service