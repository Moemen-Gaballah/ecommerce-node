const productsModel = require('../models/products.models')

exports.getHome = (req, res, next) => {
    console.log(req.session.userId);

    // get products
    // render index.ejs
    // productsModel.getAllProducts().then(products => {
    //     res.render('index', {
    //         products: products
    //     });
    // })

    // get Category
    let category = req.query.category;
    let validCategories = ['clothes', 'phones', 'computers', 'accessories'];
    if (category && validCategories.includes(category)){
    // if (category && category !== 'all'){
        productsModel.getProductsByCategory(category).then(products => {
            res.render('index', {
                products: products,
                isUser: req.session.userId
            });
        });
    }else {
        productsModel.getAllProducts().then(products => {
            res.render('index', {
                products: products,
                isUser: req.session.userId,
                validationError: req.flash('validationErrors')[0]
            });
        });
    }

}