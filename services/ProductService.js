const createError = require('http-errors');
const ProductModel = require('../model/product');
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async get() {
    try {
      console.log('made in to product service')
      const products = await ProductModelInstance.getAll()

      if (!products) {
        res.status(401).json({ detail: 'No Products' })
        throw createError(401, 'No Products');
      }

      console.log('this is the products in service class ', products.rows)

      return {
        message: 'Products succefully fetched',
        data: {
          products: products.rows
        }
      }

    } catch (err) {
      throw createError(500, err);
    }
  };
}
