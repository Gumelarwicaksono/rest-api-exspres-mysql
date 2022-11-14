const { DataTypes, Op } = require('sequelize');
const sequelize = require('../../config/sequelize');
const fs = require('fs');
const path = require('path');

// create table
const product = sequelize.define('product', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
  },
});
// create product
const newProduct = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await product.sync();
      const result = await product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};
// get product
const view = async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      const result = await product.findAll({
        where: { name: { [Op.like]: `%${search}%` } },
      });
      res.send({
        status: 'sucsess',
        data: result,
      });
    } else {
      const result = await product.findAll({
        attributes: ['id', 'user_id', 'name', 'price', 'stock', 'status', 'image_url'],
      });
      res.send({
        status: 'sucsess',
        data: result,
      });
    }
  } catch (error) {
    res.send({
      status: error,
    });
  }
};
const view_id = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await product.findAll({
      where: {
        id,
      },
    });
    res.send({
      status: 'sucsess',
      data: result,
    });
  } catch (error) {
    res.send({
      status: error,
    });
  }
};
// update product
const update = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const id = req.params.id;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await product.update(
        { user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` },
        {
          where: {
            id,
          },
        }
      );
      res.json({
        status: 'sucsess',
        message: 'data berhasil di update',
      });
    } catch (error) {
      res.send(error);
    }
  }
};
// delete product
const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    await product.destroy({
      where: {
        id,
      },
    });
    res.json({
      status: 'sucsess',
      mesage: 'data berhasil di hapus',
    });
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  newProduct,
  view,
  view_id,
  update,
  destroy,
};
