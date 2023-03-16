import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
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
    if (to.path !== '/login') {
        console.log(1);
        if (token) {
            console.log('有token');
            // generaMenu()
            console.log('fangxing');
            next()
        } else {
            console.log('去登陆');
            next(`/login?redirect=${to.path}`)
        }
    } else {
        console.log(2);
        if (token) {
            
            
            next('/')
        } else {
            next()
        }
    }
})
router.afterEach(() => {
    NProgress.done()
})
