var db = require('../db.js');

var sequelize = db.sequelize;
var DataTypes = db.DataTypes;

var userModel = sequelize.define("account", {
    account_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "必须是电子邮件格式"
            }
        }
    },
    account_pwd: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    },
    account_statu: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = userModel;
