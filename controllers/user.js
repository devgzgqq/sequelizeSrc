var userModel = require('../models/user.js');

var userController = {
	setting: function(req, res) {
		res.render('user/setting');
	},
	admin: function(req, res) {
		res.render('user/admin');
	}
};

module.exports = userController;