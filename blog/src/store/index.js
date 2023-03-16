import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import user from './modules/user.js'
Vue.use(Vuex)

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const store = new Vuex.Store({
    state: {
        blogInfo: {},
        articleLikeSet: [],
        searchFlag: false,
        loginType: 1,
        sideDrawer:false,
        dark:false
    },
    mutations,
    actions,
    getters,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            key: 'zdao',
            paths:['user']
        })
    ],
    modules:{
        user
    }
})

export default store