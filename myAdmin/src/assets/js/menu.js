import router from "@/router"
import Layout from "@/layout/index.vue";
import store from "@/store";
import {getUserMenus} from '@/api/menu.js'
export async function generaMenu() {
    let userMenuList =await getUserMenus()
    if(userMenuList.length){
        userMenuList.forEach(item => {
            console.log(item);
            if (item.icon) {
                item.icon = "iconfont " + item.icon;
            }
            if (item.component == "Layout") {
                item.component = Layout;
            }
            if (item.children && item.children.length > 0) {
                item.children.forEach(route => {
                    route.icon = "iconfont " + route.icon;
                    console.log(loadView(route.component));
                    route.component = loadView(route.component);
                });
            }
        });
        console.log(userMenuList);
        console.log(2);
        // 添加侧边栏属性
        store.commit("saveUserMenuList", userMenuList)
        router.addRoutes(userMenuList)
        console.log(router);
    }
    
}


const loadView = view => {
    return () => import(`@/views${view}`)
}