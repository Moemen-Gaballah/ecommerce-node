const express = require('express');
const path = require('path');

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')

const app = express();

app.use(express.static(path.join(__dirname, 'public','assets')));
app.use(express.static(path.join(__dirname, 'public','images')));

app.set('view engine', 'ejs');
app.set('views', 'views') // default

app.use('/', homeRouter);

app.use('/product', productRouter)
// app.get('/', (req, res, next) => {
//    // res.send('Hello World!')
//    res.render('index');
// });

// app.get('/product/:id', (req, res, next) => {
//    res.send('Hello World!')
//    // res.render('index');
// });

app.listen(3000, () => {
   console.log('Server listen on port 3000');
});
