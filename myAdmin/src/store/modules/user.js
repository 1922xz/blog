import axios from 'axios'
export default {
    state: {
        token: "",
        userinfo: {
            avatar: "",
            email: "",
            intro: "",
            nickname: "",
            website: null,
        },

    },
    mutations: {
        logout(state,){
            state.token="",
            localStorage.clear()
            
        },
        login(state, data) {
            state.token = data.token;
            localStorage.setItem("token", data.token)
            state.userinfo = data.userinfo
        }
    },
    actions: {
        login(context, userinfo) {
            let result = axios.post("http://localhost:3008/api/login", userinfo).then((res) => {
                if (res.data.data.flag) {
                    console.log(res.data.data);
                    context.commit("login", res.data.data);
                    return true
                } else {
                    return false
                }
            });
            return result
        }
    },
}