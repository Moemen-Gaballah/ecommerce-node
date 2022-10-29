const router = require('express').Router();

const productController = require('../contollers/product.controller')

router.get('/', productController.getProduct)

router.get('/:id', productController.getProductById);

module.exports = router;