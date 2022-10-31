const cartModel = require("../models/cart.model");
const validationResult = require('express-validator').validationResult;

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0]
        })
    }).catch(err => console.log(err))
}




exports.postCart = (req, res, next) => {
    if(validationResult(req).isEmpty()){

        // if(cartModel.productExistCart){
        //
        //     var data = {
        //         name: req.body.name,
        //         price: req.body.price,
        //         amount: req.body.amount,
        //         productId: req.body.productId,
        //         userId: req.session.userId,
        //         timestamp: Date.now()
        //     };
        // }
        cartModel.productExistCart(req.body.productId,req.session.userId).then(cartItem => {
            // console.log('31 cartItem ', cartItem);

            if(cartItem){
                console.log("here cartItem Exist")
                console.log(cartItem._id)
                console.log(cartItem.amount)
                console.log('req.body.amount ' , req.body.amount)
                cartModel.editItem(cartItem._id,{
                    name: req.body.name,
                    price: req.body.price,
                    amount: parseInt(cartItem.amount) + parseInt(req.body.amount),
                    productId: req.body.productId,
                    userId: req.session.userId,
                    timestamp: Date.now()
                }).then(() => {
                    res.redirect('/cart')
                }).catch(err => {
                    console.log(err)
                })

            }else {
                cartModel.addNewItem({
                    name: req.body.name,
                    price: req.body.price,
                    amount: req.body.amount,
                    productId: req.body.productId,
                    userId: req.session.userId,
                    timestamp: Date.now()
                }).then(() => {
                    res.redirect('/cart')
                }).catch(err => {
                    console.log(err)
                })
            }

        }).catch(err => console.log(err))

        // console.log(cartModel.productExistCart)

        // cartModel.addNewItem({
        //     name: req.body.name,
        //     price: req.body.price,
        //     amount: req.body.amount,
        //     productId: req.body.productId,
        //     userId: req.session.userId,
        //     timestamp: Date.now()
        // }).then(() => {
        //     res.redirect('/cart')
        // }).catch(err => {
        //     console.log(err)
        // })
    }else {
        req.flash('validationErrors',  validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postSave = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.editItem(req.body.cartId, {
            amount: req.body.amount,
            timestamp: Date.now()
        }).then(() => res.redirect("/cart")).catch(err => console.log(err))
    }else {
        req.flash('validationErrors',  validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
}

exports.deleteAll = (req, res, next) => {
    cartModel.deleteAll(req.session.userId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
}
