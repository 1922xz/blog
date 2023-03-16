import { sendCode,register } from '@/api/user';
export default {
    state: {
        registerFlag: false,
        loginFlag: false,
        forgetFlag:false,
        userId: "",
        avatar: "",
        nickname: "",
        intro: "",
        webSite: "",
        email: "",
    },
    mutations: {
        login(state, user) {
            // console.log(user);
            localStorage.setItem("token", user.token)
            state.userId = user.userinfo.id
            state.avatar = user.userinfo.avatar
            state.nickname = user.userinfo.nickname
            state.intro = user.userinfo.intro
            state.webSite = user.userinfo.webSite
            state.email = user.userinfo.email
        },
        logout(state) {
            state.avatar = null;
            state.nickname = null;
            state.intro = null;
            state.webSite = null;
            state.email = null;
            localStorage.clear("token")
        },
        switchSearch(state, payload) {
            state.searchFlag = payload;
        },
        switchLogin(state, payload) {
            state.loginFlag = payload
        },
        closeModel(state) {
            state.registerFlag = false;
            state.loginFlag = false;
        },
        openLogin(state) {
            state.registerFlag = false,
            state.forgetFlag=false
            state.loginFlag = true
        },
        openRegister(state) {
            state.loginFlag = false;
            state.registerFlag = true;
        },
        openForget(state) {
            state.loginFlag = false;
            state.forgetFlag = true;
        },
    },
    actions: {
        sendCode(_, params) {
            return sendCode(params)
        },
        register(_, user) {
            return register(user)
        }
    }
}