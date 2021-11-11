const router = require('express').Router();

const productsModel = require('../products/products-model');

// ==============================================

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// ==============================================

const f = async (cart_items) => {
  console.log('cart_items: ', cart_items);

  let products = [];
  for (let i = 0; i < cart_items.length; ++i) {
    const product = await productsModel.findById(cart_items[i].product_id);
    product.cart_quantity = cart_items[i].quantity;
    products.push(product);
  }

  return products.map((product, idx) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price,
      },
      quantity: product.cart_quantity,
    };
  });
};

// ==============================================

// [POST]  /api/checkout
router.post('/', async (req, res) => {
  try {
    const line_items = await f(req.body.items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `https://joshua-holloway.com/`,
      cancel_url: `https://joshua-holloway.com/`,
      // success_url: `${process.env.CLIENT_URL}/success.html`,
      // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==============================================

module.exports = router;
