const roleDao = require('../dao/role.js')
const Role = require('../model/role.js')
const menuDao = require('../dao/menu')
const getRoles = async (req, res) => {
    let data = []
    const { keywords } = req.query
    if (!keywords) {
        let roles = await roleDao.getRoles()
        for (i of roles) {
            let role = new Role(i)
            role.menuIdList = await roleDao.getRoleMenuList(role.id).then(resp => {
                if (resp) {
                    return resp.map(e => e.id)
                } else {
                    console.log('获取菜单失败');
                }
            })
            data.push(role)
        }
        // console.log(data);
        res.send({ data })
    }
}
const updateRoles = async (req, res) => {
    let { id, roleName, roleLabel, menuIdList, isDisable } = req.fields
    if (menuIdList) {
        await roleDao.getMenuIdList(id).then(async resp => {
            let idList = resp.map(e => e.menuId)
            const add = menuIdList.filter(item => !idList.includes(item));
            const drop = idList.filter(item => !menuIdList.includes(item));
            console.log('jia');
            console.log(add);
            console.log('jian');
            console.log(drop);
            if (add.length>0) {
                console.log('增加');
                for (i in add) {
                    console.log(i);
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                    let addRes = await roleDao.addMenus({
                        roleId: id,
                        menuId: add[i]
                    }).then(resp => {
                        console.log(resp);
                    })
                }

            } if (drop.length>0) {
                console.log('减少');
                let deleteRes = await roleDao.deleteMenus(id, ...drop).then(resp => {
                    if (resp.affectedRows >= 1) {
                        console.log('成功啦');
                        return true
                    } else {
                        console.log('没修改');
                    }
                })
            }
        })


    }
}
module.exports = {
    getRoles,
    updateRoles
}