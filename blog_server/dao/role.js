const db = require('../db/index.js')
const getRoles=()=>{
    const sql="select * from tb_role"
    return db.execute(sql)
}
const getRoleMenuList=(id)=>{
    const sql="select id,name,parentId from tb_menu where id in (select menuId from tb_role_menu where roleId="+id+')'
    return db.execute(sql)
}
const deleteMenus=(roleId,...menuIds)=>{
    const sql='delete from tb_role_menu where roleId='+roleId+' and menuId in ('+menuIds+')'
    return db.execute(sql)
}
const getMenuIdList=(id)=>{
    const sql = 'select menuId from tb_role_menu where roleId='+id
    return db.execute(sql)
}
const getRoleId=(id)=>{
    console.log(id);
    const sql='select roleId from tb_user_role where userId='+id
    return db.execute(sql)
}
const addMenus = (args) => {
    // console.log(args);
    const sql = 'insert into  tb_role_menu SET?'
    return db.execute(sql,args)
}
module.exports={
    getRoles,
    getRoleMenuList,
    deleteMenus,
    getMenuIdList,
    getMenuIdList,
    addMenus,
    getRoleId
}