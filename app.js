const exspress = require('express');
const app = exspress();
const port = 3000;

app.get('/', (req, res) => {
  res.send({
    page: 1,
    description: 'halaman home',
  });
});
app.get('/about', (req, res) => {
  res.send({
    page: 2,
    description: 'halaman about',
  });
});
app.get('/contact', (req, res) => {
  res.send({
    page: 3,
    description: 'halaman contact',
  });
});

app.use((req, res, next) => {
  res.send({
    page: 'Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`App runing at : http://localhost:${port}`);
});
