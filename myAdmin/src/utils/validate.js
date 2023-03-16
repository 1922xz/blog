export const validtetitle = (rule, value, callback)=>{
    if (!value) {
        return callback(new Error('标题不能为空'));
    }
    callback()
}