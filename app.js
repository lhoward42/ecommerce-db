const express = require("express");
const app = new express();
const cors = require("cors");
app.use(require("./middleware/headers"));
app.use(cors());
const { sequelize } = require("./db");
const controllers = require("./controllers");
const { appPort, dbName, dbURL } = require("./config/index");
const {
  createShippingOption,
  getShippingOptions,
} = require("./stripe/shipping");
const createCheckoutSession = require("./stripe/checkout");
const webhook = require("./stripe/webhooks");
const validateToken = require("./middleware/validate-jwt");

//this is so we know that the webhook is coming from stripe
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
// app.use(function (request, response, next) {
//   if (process.env.NODE_ENV != "development" && !request.secure) {
//     return response.redirect("https://" + request.headers.host + request.url);
//   }
//   next();
// });

app.use("/admin", controllers.adminController);
app.use("/product", controllers.productController);
app.use("/email-list", controllers.emailListController);

app.post("/create-checkout-session", createCheckoutSession);
app.post("/create-shipping-option", validateToken, createShippingOption);
app.get("/get-shipping-options", getShippingOptions);
app.post("/webhook", webhook);

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(appPort);
  })
  .catch((err) => {
    throw `[Server]: Server crashed. Error = ${err} ${dbURL}`;
  });
