module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        imageUrl: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: [],
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
        property: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        value: {
            type: DataTypes.ARRAY(DataTypes.STRING(300)),
            defaultValue: [],
        },
        property2: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        value2: {
            type: DataTypes.ARRAY(DataTypes.STRING(300)),
            defaultValue: [],
        },
    })
    return Product;
}