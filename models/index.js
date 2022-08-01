const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

const DefineAdmin = require("./adminModel");
const DefineToken = require("./tokenModel");
const DefineProduct = require("./productModel");

const Admin = DefineAdmin(sequelize, DataTypes);
const Token = DefineToken(sequelize, DataTypes);
const Product = DefineProduct(sequelize, DataTypes);
Admin.hasMany(Token);
Token.belongsTo(Admin);

Admin.hasMany(Product);
Product.belongsTo(Admin);

syncDb( sequelize, { alter: true });

module.exports = {
    Admin,
    Token,
    Product
}