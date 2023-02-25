const { stripe } = require("../config/index");
const router = require("express").Router();

async function createShippingOption(req, res) {
  const {
    display_name,
    max_miles,
    min_miles,
    max_price,
    min_price,
    min_delivery_est,
    max_delivery_est,
    amount,
  } = req.body;
  try {
    let shippingObject = {
      display_name: display_name,
      type: "fixed_amount",
      fixed_amount: { amount: amount, currency: "usd" },
      metadata: {
        max_miles,
        min_miles,
        max_price,
        min_price,
      },
      delivery_estimate: {
        minimum: {
          unit: "day",
          value: min_delivery_est,
        },
        maximum: {
          unit: "day",
          value: max_delivery_est,
        },
      },
    };
    let response = await stripe.shippingRates.create(shippingObject);
    res.status(200).json("a new shipping option has been created");
  } catch (err) {
    res
      .status(400)
      .json({ err: "an error occurred, unable to create shipping option" });
  }
  res.json();
}

async function getShippingOptions(req, res) {
  let message;
  try {
    let shippingRates = await stripe.shippingRates.list({});
    message = {
      message: "Shipping rates have been retrieved",
      data: shippingRates,
    };
  } catch (err) {
    message = {
      message: "an error occurred, could not retrieve shipping options",
      err,
      stripe,
    };
  }
  res.json(message);
}

module.exports = {
  createShippingOption,
  getShippingOptions,
};
//
