export default {
    openDrawer(state) {
        state.sideDrawer = !(state.sideDrawer)
    },
    checkBlogInfo(state, blogInfo) {
        // console.log(blogInfo);
        state.blogInfo = blogInfo
    },
   
    switchTheme(state) {
        let root = document.querySelector("html");
        // console.log('调用了');
        if (root.dataset.theme == "dark") {
            state.dark = false
            root.dataset.theme = "";
        } else {
            state.dark = true
            root.dataset.theme = "dark";
        }
    },
   
    updateUserInfo(state, user) {
        state.nickname = user.nickname;
        state.intro = user.intro;
        state.webSite = user.webSite;
    },


}
