const router = require("express").Router();

const bodyParser = require("body-parser");
const authGuard = require("./guards/auth.guard")
const check = require("express-validator").check
const orderController = require("../contollers/order.controller")

router.get('/', authGuard.isAuth, orderController.getOrders)

router.post('/checkout',
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({
        min: 1
    }).withMessage('amount must be greater than 0'),
    orderController.checkout
)


module.exports = router;