const {Sequelize} = require('sequelize');
const { dbURL } = require("./config/index")

console.log(dbURL);
const sequelize = new Sequelize(dbURL);

async function syncDb(sequelize, options){
    const { force, alter } = options;
    try{
        if (force) await sequelize.sync({ force: true });
        else if (alter) await sequelize.sync({ alter: true });
        else await sequelize.sync();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    sequelize,
    syncDb
};