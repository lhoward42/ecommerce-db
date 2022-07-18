const Express = require("express");
const app = Express();
const dbConnection = require('./db');
const controllers = require('./controllers');

app.use("/admin", controllers.adminController );

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3001, () => {
        console.log("Server: App is listening on 3001");
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })