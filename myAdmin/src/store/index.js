import Vue from "vue";
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)
import article from './modules/article.js'
import user from './modules/user.js'
export default new Vuex.Store({
    state: {
        userMenuList: [],
        collapse: false,
        tabList: [{ name: "首页", path: "/" }],
        
    },
    mutations: {
        saveUserMenuList(state, userMenuList) {
            state.userMenuList = userMenuList
        },
        trigger(state) {
            state.collapse = !state.collapse
        },
        saveTab(state, tab) {
            if (state.tabList.findIndex(item => item.path === tab.path) == -1) {
                state.tabList.push({
                    name: tab.name,
                    path: tab.path
                })
            }
        },
        removeTab(state, tab) {
            var index = state.tabList.findIndex(item => item.name === tab.name);
            state.tabList.splice(index, 1);
        },
        resetTab(state) {
            state.tabList = [{ name: "首页", path: "/" }];
        },
        
    },
    actions: {
        uploadImg(context, file) {
            let filetype = file.type === "image/png" ? "png" : "jpg";
            // 重命名要上传的文件
            const keyname =
                "dfairy" +
                Date.parse(new Date()) +
                Math.floor(Math.random() * 100) +
                "." +
                filetype;
            var formdata = new FormData();
            const config = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            var imgurl = axios.get("/api/admin/articles/images").then((res) => {
                formdata.append("key", keyname);
                formdata.append("file", file);
                formdata.append("token", res.data.upToken);
                return new Promise((resolve) => {
                    axios
                        .post("https://up.qiniup.com", formdata, config)
                        .then((resp) => {
                            const img =
                                "http://rqxhdheu5.hd-bkt.clouddn.com/" + resp.data.key;
                            resolve(img);
                        });
                });
            });
            return imgurl;
        },
        
    },
    getters: {
        isCollapse(state) {
            return state.collapse 
        },
    },
    modules: {
        article,
        user
    }
})