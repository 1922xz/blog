import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = () => import('@/views/home/Home.vue')
const article = () => import('@/views/article/Article.vue')
const archives = () => import('@/views/find/archive/Archive.vue')
const category = () => import('@/views/find/category/Category.vue')
const tags = () => import("@/views/find/tag/Tag.vue")
const about = () => import('@/views/about/About.vue')
const albums = () => import("@/views/amusement/album/Album.vue")
const talks = () => import('@/views/amusement/talk/index.vue')
const message = () => import("@/views/message/Message.vue")
const articleList = () => import('@/views/article/ArticleList.vue')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home,
    },
    {
      path: "/articles/:articleId",
      component: article
    },
    {
      path: "/archives",
      component: archives,
      meta: {
        title: "归档"
      }
    },
    {
      path: "/categories",
      component: category,
      meta: {
        title: "分类"
      }
    },
    {
      path: "/categories/:categoryId",
      component: articleList
    },
    {
      path: "/tags/:tagId",
      component: articleList
    },
    {
      path: "/tags",
      component: tags,
      meta: {
        title: "标签"
      }
    },
    {
      path: "/about",
      component: about,
      meta: {
        title: "关于"
      }
    },
    {
      path: "/albums",
      component: albums,
      meta: {
        title: "相册"
      }
    },
    {
      path: "/albums/:albumsId",
      component: () => import("@/views/amusement/album/Photo.vue")
    },
    {
      path: "/talks",
      component: talks,
      meta: {
        title: "说说"
      }
    },
    {
      path: "/talks/:talkId",
      component: () => import("@/views/amusement/talk/TalkInfo.vue"),
      meta: {
        title: "说说"
      }
    },
    {
      path: "/user",
      component: () => import("@/views/user/User.vue")
    },
    {
      path: "/message",
      component: message,
      meta: {
        title: "留言板"
      }
    },
  ],

  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     console.log(1);
  //     console.log(savedPosition);
  //     return savedPosition
  //   } else {
  //     from.meta.savedPosition = document.body.scrollTop;
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // }
})
