import service from "@/utils/service";
// console.log(service);
export const getUserMenus = () => service.get('/api/admin/user/menus')