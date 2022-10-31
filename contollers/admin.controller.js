const validationResult = require('express-validator').validationResult;

const productModel = require("../models/products.models");


exports.getAdd = (req, res, next) => {
    res.render("add-product", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true
    });
};

exports.postAdd = (req, res, next) => {
    console.log(validationResult(req).array());

    console.log(req)
    console.log(req.file)

    if(validationResult(req).isEmpty()) {
        productModel.addNewProduct({
            name: req.body.name,
            price:req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            category: req.body.category,
            image: req.file.filename,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/product')
        }).catch(err => {
            console.log(err)
        })
    }else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
};