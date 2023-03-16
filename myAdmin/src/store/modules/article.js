import axios from 'axios'
export default {
    state: {
        article: {
            id: null,
            articleTitle: "",
            articleContent: "",
            articleCover: "",
            categoryName: null,
            tagNameList: [],
            originalUrl: "",
            isTop: 0,
            type: 1,
            status: 1,
        },
    },
    mutations: {
        getArticle(state, article) {
            state.article = article
        }
    },
    actions: {
        getCategory(context, id) {
            axios.get("/api/admin/articles/" + id).then(({ data }) => {
                context.commit('getArticle', data.data)
            });
        }
    },
}