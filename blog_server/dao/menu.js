const db=require('../db/index.js')

const getParentMenu=()=>{
    // const sql ="select id,name,path,component,icon,isHidden as hidden from tb_menu where parentId IS NULL ORDER BY orderNum"
    const sql = "select * from tb_menu where parentId IS NULL ORDER BY orderNum"
    return db.execute(sql)
}
const getMenusById=(...ids)=>{
    const sql = "select id,name,path,component,icon,parentId,orderNum from tb_menu where id in ("+ids+") and isHidden=0 ORDER BY orderNum"
    return db.execute(sql)
}
const getChildrenById=(id)=>{
    // const sql = "select name,path,component,icon,isHidden as hidden from tb_menu where parentId =? ORDER BY orderNum"
    const sql = "select * from tb_menu where parentId =? ORDER BY orderNum"
    return db.execute(sql,id)
}
const updateMenu=(id,args)=>{
    let sql=''
    // console.log(id,args);
    // console.log('------------------------------------------');
    if(id){
        sql = "update tb_menu SET? where id=" + id
    }else {
        args.createTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        sql = "insert into tb_menu SET?"
    }
    return db.execute(sql,args)
}
module.exports={
    getParentMenu,
    getChildrenById,
    updateMenu,
    getMenusById
}