import service from "@/utils/axios";
export const login = (data) => service({ url: "/api/login", method: 'post', data })
export const sendCode = (params) => service({ url: "/api/users/code", method: 'get',params})
export const register = (data) => service({ url: "/api/register", method: 'post', data })