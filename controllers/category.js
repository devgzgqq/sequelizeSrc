var Category = require('../models/category.js');

var categoryController = {
	index: function(req, res) {
		res.render('category/add');
	},
	addCategory: function(req, res) {
		var categoryName = req.body.category_name;

		Category.create({category_name: categoryName})
		.then(function() {
			res.render('category/add', {success: true, info: '\"' + categoryName + '\"已成功添加！'});
		});
	}
};

module.exports = categoryController;