const db = require('../db');

module.exports = class UserModel {

  async create(data) {
    try {
      const {email, password} = data

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = `INSERT INTO users (email, password)
                        VALUES ($1, $2);`
      const values = [email, password]

      // Execute SQL statment
      await db.query(statement, values);

      return;

    } catch (err) {
      throw new Error(err);
    }
  }

  async update(data) {
    try {

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = `UPDATE users
                         SET first_name=$1, last_name=$2, mobile=$3, address_name=$4, address_street=$5, address_county=$6, postcode=$7, country=$8
                         WHERE id=$9`
      const values = [data.first_name, data.last_name, data.mobile, data.address_name, data.address_street, data.address_county, data.postcode, data.country, data.id]

      // Execute SQL statment
      const result = await db.query(statement, values);

      return { message: 'User updated' }

    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByEmail(email) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE email = $1`;
      const values = [email];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null;

    } catch (err) {
      throw new Error(err);
    }
  }


  async findOneById(id) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM users
                         WHERE id = $1`;
      const values = [id];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }

      return null;

    } catch (err) {
      throw new Error(err);
    }
  }
}
