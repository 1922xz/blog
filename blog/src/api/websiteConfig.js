import service from "@/utils/axios";
export const getWebsiteConfig = () => service({ url: "/api/websiteConfig" })