const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

const DefineAdmin = require("./adminModel");
const DefineToken = require("./tokenModel");

const Admin = DefineAdmin(sequelize, DataTypes);
const Token = DefineToken(sequelize, DataTypes);

Admin.hasMany(Token);
Token.belongsTo(Admin);

syncDb( sequelize, { alter: true });

module.exports = {
    Admin,
    Token
}