const productsModel = require('../models/products.models')

exports.getProducts = (req, res, next) => {
    // get products
    // render page
    let id = req.params.id;
    productsModel.getProductById(id).then((product) => {
       res.render('product', {
           product: product,
           isUser: req.session.userId,
           isAdmin: req.session.userId,
           pageTitle: 'Product'
       })
    });
}


exports.getProduct = (req, res, next) => {
    productsModel.getFirstProduct().then(product => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.userId,
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
           product: product,
           isUser: req.session.userId,
           isAdmin: req.session.userId,
       })
    });

}