import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {generaMenu} from './menu'
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach((to, from, next) => {
   
    NProgress.start()
    let token = localStorage.getItem('token')
    // console.log(token)
    if (to.path !== '/login') {
        if (token) {
            if (store.state.userMenuList.length){
                next()
            }else{
                generaMenu(() => { next({ ...to, replace: true }) })
            }
        } else {
            next(`/login?redirect=${to.path}`)
        }
    } else {
        console.log(token)
        console.log(to, 'to')
        if (token) {
            if (store.state.userMenuList.length) {
                next('/')
            } else {
                console.log(123)
                generaMenu(() => { next('/') })
            }
        } else {
            next()
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})
