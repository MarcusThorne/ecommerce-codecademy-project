const db = require('../db');

module.exports = class ProductsModel {

  async getAll() {
    try {
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = `SELECT *
                         FROM products`

      // Execute SQL statment
      const products = await db.query(statement);

      return products;

    } catch (err) {
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`
      const value = [ id ]

      const product = await db.query(statement, value);
      return product.rows[0]

    } catch (error) {
      throw new Error(error)
    }
  }
}
