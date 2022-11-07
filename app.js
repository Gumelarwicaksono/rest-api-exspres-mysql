const exspress = require('express');
const app = exspress();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname });
});
app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root: __dirname });
});
app.get('/contact', (req, res) => {
  res.sendFile('./contact.html', { root: __dirname });
});

app.use((req, res, next) => {
  res.send({
    page: 'Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`App runing at : http://localhost:${port}`);
});
