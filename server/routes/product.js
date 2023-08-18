const express = require('express');
const router = express.Router();

const ProductService = require('../services/ProductService');
const ProductServiceInstance = new ProductService();

module.exports = (app) => {

  app.use('/products', router);

  router.get('/', async (req, res, next) => {

    try {
      console.log('getting products')

      const response = await ProductServiceInstance.get();
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  });
}
