const { sequelize, syncDb } = require("../db");
const { DataTypes } = require("sequelize");

const DefineAdmin = require("./adminModel");

const Admin = DefineAdmin(sequelize, DataTypes);

syncDb( sequelize, { alter: true });

module.exports = {
    Admin,
}