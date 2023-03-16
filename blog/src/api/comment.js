import service from "@/utils/axios"
export const getReplyById=(params)=>service({url:'/api/comments/reply',params})
export const getComments=(params)=>service({url:'/api/comments',params})