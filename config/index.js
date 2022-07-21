require("dotenv").config();

const config = {
    appPort: parseInt(process.env.PORT),
    dbName: process.env.DB_NAME,
    dbURL: `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${parseInt(process.env.DB_PORT)}/${process.env.DB_NAME}`,
    stripe: require("stripe")(`${process.env.SECRET_KEY}`),
    jwtSecret: process.env.JWT_KEY,
};

module.exports = config;