import service from "@/utils/axios";
export const getTalks = (params) => service({ url:"/api/talks",params})