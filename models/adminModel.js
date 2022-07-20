module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Admin;
}
