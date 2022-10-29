const productsModel = require('../models/products.models')

exports.getProducts = (req, res, next) => {
    // get products
    // render page
    let id = req.params.id;
    productsModel.getProductById(id).then((product) => {
       res.render('product', {
           product: product
       })
    });
}


exports.getProduct = (req, res, next) => {
    productsModel.getFirstProduct().then(product => {
        res.render('product', {
            product: product
        })
    });
}


exports.getProductById = (req, res, next) => {
    // get id
    // get product
    // render page
    let id = req.params.id;
    productsModel.getProductById(id).then((product) => {
       res.render('product', {
           product: product
       })
    });

}