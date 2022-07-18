const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:noSittingDucks2021@localhost:5432/valentine-tingz");

module.exports = sequelize;