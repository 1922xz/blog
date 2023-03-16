module.exports = class Role {
    constructor({
        createTime,
        id,
        isDisabled,
        roleName,
        roleLabel,
    }) {
        this.createTime = createTime;
        this.id = id;
        this.isDisabled = isDisabled;
        this.roleName = roleName;
        this.roleLabel=roleLabel
    }
}