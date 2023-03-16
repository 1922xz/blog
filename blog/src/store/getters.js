export default {
    blogInfo(state) {
        return state.blogInfo
    },
    getCover(state, getters) {
        return function (key) {
            let res = getters.blogInfo.pageList.find(item => {
                return item.pageLabel == key
            })
            return res.pageCover
        }
    },
    websiteAuthor(state,getters){
        return getters.blogInfo
            ? getters.blogInfo.websiteAuthor
            : "";
    },
    paginationLength(state){
        return Math.ceil(state.blogInfo.articleCount / 5)
    },
    isDark(state){
        // console.log(state);
        return state.dark
    }

}