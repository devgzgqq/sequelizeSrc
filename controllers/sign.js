var crypto = require('crypto');
var userModel = require('../models/user.js');

var signController = {
	signup: function(req, res) {
		//获取数据
		var accountName = req.body.account_name;
		var accountPwd = req.body.account_pwd;
		var rePwd = req.body.re_pwd;

		console.log(accountName + accountPwd);

		userModel.create({
            account_name: accountName,
            account_pwd: crypto.createHash('md5').update(accountPwd).digest('hex')
        }).then(function() {
            res.render('sign/signup',{info: '注册成功'});
        });
	}
};

module.exports = signController;