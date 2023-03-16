module.exports=class Menu {
    constructor({
        component='',
        createTime,
        icon='',
        id,
        isDisabled,
        isHidden,
        name,
        orderNum,
        path,
        children=[]
    }) {
        this.component = component;
        this.createTime = createTime;
        this.icon = icon;
        this.id = id;
        this.isDisabled = isDisabled;
        this.isHidden = Number(isHidden);
        this.name = name;
        this.orderNum = orderNum;
        this.path = path;
        this.children=children
    }
}