import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import router from './router/index.js'
import './assets/css/index.css'
import axios from "axios";
import VueAxios from "vue-axios";
import store from './store/index.js'
import './assets/css/icon/iconfont.css'
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import dayjs from "dayjs";
import tagCloudcopy from './components/tag-cloud'
import '@/assets/js/permission.js'
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3008"
Vue.use(VueAxios, axios);
Vue.use(ElementUI)
Vue.use(tagCloudcopy)
Vue.use(mavonEditor)
Vue.prototype.$moment = dayjs;
Vue.filter("date", function (value, formatStr = "YYYY-MM-DD") {
  return dayjs(value).format(formatStr);
});

Vue.filter("dateTime", function (value, formatStr = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(value).format(formatStr);
});

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
