module.exports = (sequelize, DataTypes) => {
    const EmailList = sequelize.define("EmailList", {
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    })
    return EmailList;
};