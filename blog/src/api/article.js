import service from "@/utils/axios"
export const getArticles=(params)=>service({
    url:'/api/articles',
    params
})
export const getArchive = (params) => service({ url:'/api/articles/archives',params})

export const getArticleById=(id)=>service({url:'/api'+id})

export const getArticlesByCondition = (params) => service({ url:'/api/condition',params})

export const getCategory = () => service({ url:'/api/categories'})

export const getTags=()=>service({url:'/api/tags'})