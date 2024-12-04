module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
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
        subCategory: {
            type: DataTypes.STRING,
            defaultValue: "",
        },
        sale: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    })
    return Product;
}