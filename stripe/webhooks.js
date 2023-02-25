const { stripe, webhook_secret } = require("../config/index");

const webHookHandlers = {
  "checkout.session.completed": (data) => {},
};

const webhook = (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req["rawBody"], sig, webhook_secret);
    res.status(200).json().end();
  } catch (err) {
    return res.status(400).send(`Webhook error ${err.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
  }
};

module.exports = webhook;
