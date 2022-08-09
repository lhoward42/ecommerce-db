const express = require("express");
const app = new express();
const cors = require("cors");
app.use(require("./middleware/headers"));
app.use(cors());
const { sequelize } = require("./db");
const controllers = require("./controllers");
const { appPort, dbName } = require("./config/index");
const {
  createShippingOption,
  getShippingOptions,
} = require("./stripe/shipping");
const createCheckoutSession = require("./stripe/checkout");
const webhook = require('./stripe/webhooks');

//this is so we know that the webhook is coming from stripe and not a malicious request
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

app.use("/admin", controllers.adminController);
app.use("/product", controllers.productController);

app.post("/create-checkout-session", createCheckoutSession);
app.post("/create-shipping-option", createShippingOption);
app.get("/get-shipping-options", getShippingOptions);
app.post("/webhook", webhook);

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(appPort, () => {
      console.log(
        `Server: App is listening on ${appPort} and connected to ${dbName}`
      );
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
