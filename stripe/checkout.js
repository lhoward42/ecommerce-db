const { stripe } = require("../config/index");

async function createCheckoutSession(req, res) {
  const domainURL = process.env.WEB_APP_URL;
  const { line_items, customer_email, shipping_rate, shipping_amount } =
    req.body;
  let message;
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing require session parameters" });
  }
  try {
    res.status(200).json();
  } catch (error) {
    res
      .status(400)
      .json({ error: "an error occurred, unable to create session", stripe });
  }
  res.json();
}

module.exports = createCheckoutSession;
