import service from "@/utils/axios";
export const getAlbum = () => service({ url: '/api/album' ,method:'get'})
export const getPhotos=(id,params)=>service({url:'/api/photos/'+id,params})