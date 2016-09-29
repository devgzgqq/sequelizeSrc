var Sequelize = require('sequelize');
var DataTypes = Sequelize;

var sequelize = new Sequelize('gzgqq', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = {
	Sequelize: Sequelize,
	DataTypes: DataTypes,
	sequelize: sequelize
};