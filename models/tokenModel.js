module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("token", {
       token: {
           type: DataTypes.STRING(255),
           allowNull: false,
       },
       tokenExpires: {
           type: DataTypes.DATE,
           defaultValue: null,
       },
       used: {
           type: DataTypes.INTEGER,
           defaultValue: 0,
       }
       
    }, { timestamps: true })
    return Token;
}