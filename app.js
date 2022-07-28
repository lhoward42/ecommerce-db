const express = require("express");
const app = new express();
const cors = require("cors");
app.use(require('./middleware/headers'));
app.use(cors());
const { sequelize } = require('./db');
const controllers = require('./controllers');
const { appPort, dbName } = require("./config/index");
const { createShippingOption } = require('./stripe/shipping');


app.use(
    express.json({
        verify: (req, res, buffer) => (req["rawBody"] = buffer )
    })
)

app.use("/admin", controllers.adminController );

app.post("/create-shipping-option", createShippingOption);

sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        app.listen(appPort, () => {
            console.log(`Server: App is listening on ${appPort} and connected to ${dbName}` );
            });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })