const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const { view, newProduct, update, destroy, view_id } = require('./controller');

router.post('/product', upload.single('image'), newProduct);
router.get('/product/', view);
router.get('/product/:id', view_id);
router.put('/product/:id', upload.single('image'), update);
router.delete('/product/:id', upload.single('image'), destroy);

module.exports = router;
