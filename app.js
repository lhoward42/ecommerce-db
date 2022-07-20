const express = require("express");
const app = express();
const cors = require("cors")
const { sequelize } = require('./db');
const controllers = require('./controllers');

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    express.json({
        verify: (req, res, buffer) => (req["rawBody"] = buffer )
    })
)

app.use("/admin", controllers.adminController );

sequelize.authenticate()
    .then(() => sequelize.sync())
    .then(() => {
        app.listen(3001, () => {
        console.log("Server: App is listening on 3001");
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })