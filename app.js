const exspress = require('express');
const app = exspress();
const port = 4000;

app.get('/', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
  res.sendFile('./public/about.html', { root: __dirname });
});
app.get('/contact', (req, res) => {
  res.sendFile('./public/contact.html', { root: __dirname });
});

app.use((req, res, next) => {
  res.send({
    page: 'Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`App runing at : http://localhost:${port}`);
});
