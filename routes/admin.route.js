const router = require("express").Router();
const check = require("express-validator").check;
const multer = require('multer')


const adminController = require("../contollers/admin.controller");
const adminGuard = require("./guards/admin.guard")

router.get('/add', adminGuard, adminController.getAdd )
router.post('/add', adminGuard, multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images')
        },
        filename: (req, file, cb) => {
            var fileName = Date.now() + '-' + file.originalname
            // req.body.filename = fileName;
            cb(null, fileName);
        }
    })
}).single('image'), check('image').custom((value, {req}) => {

        if(req.file) return true
        else throw 'image is required'
}), adminController.postAdd )

module.exports = router;