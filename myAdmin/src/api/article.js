import service from "@/utils/service";
export const addArticle = (params) => service.post("/api/admin/auth/articles",params)