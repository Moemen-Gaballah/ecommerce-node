const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public','assets')));

app.set('view engine', 'ejs');
app.set('views', 'views') // default

app.get('/', (req, res, next) => {
   res.send('Hello World!')
});

app.listen(3000, (err) => {
   console.log(err);
   console.log('Server listen on port 3000');
});
