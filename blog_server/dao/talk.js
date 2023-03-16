const db=require('../db/index.js')
const getCount=()=>{
    const sql='select count(*) as count from tb_talk'
    return db.execute(sql) 
}

const getTalks = (current=undefined, size=undefined, status=undefined,id=undefined)=>{
    console.log(current,size,status,id);
    let sql=''
    if(status){
        sql = 'select id,content,images,isTop,status,likeCount,createTime from tb_talk where status=' + status + ''
    }else if(id){
        console.log(id);
        sql = 'select id,content,images,isTop,likeCount,createTime,status from tb_talk where id='+id
    }else{
        sql = 'select id,content,images,isTop,likeCount,createTime,status from tb_talk'
    }
    return db.execute(sql)
}
const updateTalks=(talk)=>{
    console.log(talk);
    delete talk.nickname
    delete talk.avatar
    delete talk.createTime
    const sql="update tb_talk SET ? where id="+talk.id
    return db.execute(sql,talk)
}
const addTalks=(talk)=>{
    const sql = 'insert into tb_talk SET?'
    return db.execute(sql,talk)
}
const deleteTalks=(id)=>{
    const sql='delete from tb_talk where id='+id
    return db.execute(sql)
}
module.exports={
    getCount,
    getTalks,
    addTalks,
    updateTalks,
    deleteTalks
}