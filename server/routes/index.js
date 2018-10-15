const router = require('express').Router()
const router = express.Router()
const images = require('../helpers/images')

router.get('/',(req,res)=>{
    res.status(201).json({
        message : `
        Hello
        `
    })
})

router.post('/upload',
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})
module.exports = router;