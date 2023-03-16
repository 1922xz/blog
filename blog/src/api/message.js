import service from "@/utils/axios";
export const getMessage = () => service({ url: "/api/message" })
export const sendMessage = (param) => service({ url: "/api/message",method:'post',param})