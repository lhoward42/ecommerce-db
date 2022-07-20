const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:noSittingDucks2021@localhost:5432/valentine-tingz");

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