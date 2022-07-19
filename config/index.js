require("dotenv").config();

const config = {
    stripe: require("stripe")(`${process.env.SECRET_KEY}`),
};

module.exports = config;