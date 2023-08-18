const express = require('express');
const router = express.Router();

const ProductModel = require('../model/product');
const ProductModelInstance = new ProductModel();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

module.exports = (app) => {

  app.use('/stripe', router);

  router.post('/', async (req, res, next) => {
    const storeItems = await ProductModelInstance.getAll()

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.basketItems.map(item => {
          const storeItem = storeItems.rows.map(product => {
            if(item.id === product.id) {
              return product
            }
          })

          return {
            price_data: {
              product_data: {
                name: storeItem[0].name
              },
              currency: "gbp",
              unit_amount: (storeItem[0].price * 100) + 500
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/products`
      })

      res.json({ url: session.url })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  });
}
