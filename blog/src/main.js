import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'

import animated from "animate.css";
import '@/assets/css/index.css'
import '@/assets/css/theme.css'
import '@/assets/css/AlibabaFont/iconfont1.css'

import '@/assets/css/markdown.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import InfiniteLoading from "vue-infinite-loading";
import store from './store'
import dayjs from "dayjs"
import Share from "vue-social-share"
import '@/assets/css/vue-social-share/client.css'
import VueImageSwipe from "vue-image-swipe";
import "vue-image-swipe/dist/vue-image-swipe.css";
import toast from '@/components/toast/index.js'
import { vueBaberrage } from "vue-baberrage";
Vue.config.productionTip = false
Vue.use(animated)
Vue.use(VueAxios, axios)
Vue.use(InfiniteLoading)
Vue.use(VueImageSwipe);
Vue.use(Share)
Vue.use(toast)
Vue.use(vueBaberrage);
/* eslint-disable no-new */


Vue.filter("date", value => {
  return dayjs(value).format("YYYY-MM-DD");
})
Vue.filter("year", function (value) {
  return dayjs(value).format("YYYY");
});
Vue.filter("time", function (value) {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
});
Vue.filter("hour", function (value) {
  return dayjs(value).format("HH:mm:ss");
});
router.afterEach(() => {
})

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
