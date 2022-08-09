module.exports = (sequelize, DataTypes) => {
    const Email = sequelize.define("Email", {
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }
    })
    return Email;
};