const orderModel = require("../models/order.model")
const validationResult = require('express-validator').validationResult;
const cartModel = require("../models/cart.model");

exports.getOrders = (req, res, next) => {
    orderModel.getItemsByUser(req.session.userId).then(items => {
        res.render('order', {
            items: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            validationError: req.flash('validationErrors')[0],
            pageTitle: 'Orders'
        })
    }).catch(err => console.log(err))
}


exports.checkout = (req, res, next) => {
    if(validationResult(req).isEmpty()){

        var cartId = req.body.cartId
       cartModel.getItemById(cartId).then((objCartItem) => {
           orderModel.addNewItem({
               name: objCartItem.name,
               price: objCartItem.price, // todo get price form db
               amount: req.body.amount,
               productId: objCartItem.productId,
               userId: req.session.userId,
               status: 'pending',
               address: null,
               timestamp: Date.now()
           });



       }).then(() => {
           cartModel.deleteItem(cartId).then(() => {
               res.redirect('/cart')
               return;
           }).catch(err => {
               console.log(err)
           });
       }).catch(err => {
           console.log(err)
       });



    }else {
        req.flash('validationErrors',  validationResult(req).array())
        res.redirect('/cart')
    }
}