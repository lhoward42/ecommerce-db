const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        imageName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Image
}