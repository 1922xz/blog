const albumDao = require('../dao/album.js')
const getAlbum = async (req, res) => {
    const album= await albumDao.getAlbum()
    const data={
        data:album
    }
    // console.log(data);
    res.cc(
        data
    )
}
module.exports = {
    getAlbum
}