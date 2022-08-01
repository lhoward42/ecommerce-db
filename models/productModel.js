module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            message: "Please select category for product",
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false,
        },
    })
    return Product;
}