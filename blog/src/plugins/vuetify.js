import Vue from 'vue'
import Vuetify, {VCard,VApp,VAppBar,VSnackbar,VPagination,VImg,
    VDialog,
    VCol,
    VRow,
    VAvatar,
    VMain,
    VTimeline,
    VBtn,
    VTextField,
    VTimelineItem,

}
    from 'vuetify/lib'
Vue.use(Vuetify, {
    components: {VCard,VApp,VAppBar,VSnackbar,VPagination,VImg,VDialog,VCol,VRow,
        VAvatar,
        VMain,
        VTimeline,
        VBtn,
        VTextField,
        VTimelineItem,
    }
})
const opts = {}

export default new Vuetify(opts)