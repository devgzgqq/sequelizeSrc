var db = require('../db.js');

var sequelize = db.sequelize;
var DataTypes = db.DataTypes;

var Category = sequelize.define('category', {
	category_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false
    },
    category_name: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
});

module.exports = Category;