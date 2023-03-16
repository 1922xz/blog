const menuDao = require('../dao/menu.js')
const roleDao=require('../dao/role')
const Menu = require('../model/menu')
const userDao=require('../dao/user')
const getMenus = async (req, res) => {
    // let id=req.query.id
    // console.log(id);
    let data = []
    const father = await menuDao.getParentMenu()
    for (let item of father) {
        item.hidden = Boolean(item.hidden)
        let child = await menuDao.getChildrenById(item.id).then(res => {
            if (!res[0]) {
                return null
            }
            res.forEach(e => {
                e.hidden = Boolean(e.hidden)
            });
            return res
        })
        item.id = undefined
        if (child === null) {
            const fat = {
                name: null,
                component: "Layout",
                icon: null,
                children: []
            }
            fat.children.push(item)
            fat.path = item.path
            item.path = ""
            fat.hidden = item.hidden
            data.push(fat)
        } else {
            item.children = child
            data.push(item)
        }
    }
    res.send({
        flag: true,
        data
    })

}
const getMenuList = async (req, res) => {
    let data = []
    const father = await menuDao.getParentMenu()
    for (let item of father) {
        const fat = new Menu(item)
        let child = await menuDao.getChildrenById(item.id).then((resp, child = []) => {
            if (resp[0]) {
                resp.forEach(item => {
                    child.push(new Menu(item))
                })
            }
            return child
        })
        fat.children = child
        data.push(fat)
    }
    // console.log(data);
    res.send(data)
}
const updateMenu = async (req, res) => {
    let { id, ...args } = req.fields
    // console.log(id, args);
    await menuDao.updateMenu(id, args).then(resp => {
        // console.log(resp);
        if(resp.affectedRows==1){
            res.send({
                code:200
            })
        }
    })
}
const getUserMenus=async (req,res)=>{
    console.log(req.data,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    let id=await userDao.getUserInfoId(req.data.data.name).then(resp=>resp[0].userInfoId)
    console.log(id);
    let menuIdList =await roleDao.getRoleId(id).then(async resp=>{
        let ids=await roleDao.getRoleMenuList(resp[0].roleId).then(idsresp => {
            return idsresp.map(e => e.id)
        })
        return ids
    })
    // let menuIdList=await roleDao.getRoleMenuList(roleId).then(resp=>{
    //     return resp.map(e=>e.id)
    // })
    // console.log(menuIdList);
    let menuInfo=await menuDao.getMenusById(...menuIdList)
    // console.log(menuInfo);
    // let data = menuInfo.filter(e => e.parentId == null && e.component == 'Layout')
    let data=[]
    for(let e of menuInfo){
        if (e.parentId == null && e.component != 'Layout'){
            data.push({
                "name": null,
                "component": "Layout",
                "icon": null,
                "children": [
                    e
                ],
                "path": e.path ? e.path : '/',
            })
        }else if(e.component=='Layout'){
            e.children=[]
            data.push(e)
        }
    }
    // console.log(data);
    menuInfo.forEach(e=>{
        if(e.parentId){
            data.forEach(i=>{
                if(i.id==e.parentId){
                    e.parentId=undefined
                    i.children.push(e)
                }
            })
        }
    })
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    // console.log(data);
    res.cc(data)
    
}
module.exports = {
    getMenus,
    getMenuList,
    updateMenu,
    getUserMenus
}