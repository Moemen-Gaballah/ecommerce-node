const express = require('express');
const path = require('path');

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')

const app = express();

app.use(express.static(path.join(__dirname, 'public','assets')));
app.use(express.static(path.join(__dirname, 'public','images')));
app.use(flash())

const STORE = new SessionStore({
   uri: 'mongodb://localhost:27017/ecommerce',
   connection: 'sessions'
})

app.use(session({
   secret: 'this is my secret to hash express sessions ...',
   saveUninitialized: false,
   store: STORE
}))

app.set('view engine', 'ejs');
app.set('views', 'views') // default

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter)
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use("/admin", adminRouter);

app.use("/error", (req, res, next) => {
   res.status(500)
   res.render('error', {
      isUser: req.session.userId,
      isAdmin: req.session.isAdmin
   })
});

app.get((error, req, res, next) => {
   res.redirect('/error')
})

app.get('/not-admin', (req, res, next) => {
   res.status(403)
   res.render('not-admin', {
      isUser: req.session.userId,
      isAdmin:false
   })
})

app.listen(3000, () => {
   console.log('Server listen on port 3000');
});
