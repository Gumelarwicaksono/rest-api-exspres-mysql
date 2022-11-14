const express = require('express');
const path = require('path');
const app = express();
const loger = require('morgan');
const producrouterV2 = require('./app/product-v2/routes');
const port = 3000;

app.use(loger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v2', producrouterV2);
app.use((req, res, next) => {
  res.send({
    status: 'filed',
    mesage: 'Resource' + req.originalUrl + 'Not Found',
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App runing at : http://localhost:${port}`);
});
