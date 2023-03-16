const albumDao = require('../dao/album.js')
const photoDao = require('../dao/photo')
const getPhotoCoverList = async (req, res) => {
    const id = req.params.id
    const photos = await photoDao.getPhotoCoverList(id).then((data, pho = []) => {
        data.forEach(element => {
            pho.push(element.photoSrc)
        });
        return pho
    });
    await albumDao.getAlbumById(id).then((result, data = {}) => {
        [data.photoAlbumCover, data.photoAlbumName, data.photoList] = [result[0].albumCover, result[0].albumName, photos]
        res.send({
            data
        })
    })


}
module.exports = {
    getPhotoCoverList
}