const { Sequelize } = require("sequelize");
const { dbURL } = require("./config/index");

const sequelize = new Sequelize(dbURL, {
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

async function syncDb(sequelize, options) {
  const { force, alter } = options;
  try {
    if (force) await sequelize.sync({ force: true });
    else if (alter) await sequelize.sync({ alter: true });
    else await sequelize.sync();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  sequelize,
  syncDb,
};
