var crypto = require('crypto');
var userModel = require('../models/user.js');

var signController = {
    signup: function(req, res) {
        //获取数据
        var accountName = req.body.account_name;
        var accountPwd = req.body.account_pwd;
        var rePwd = req.body.re_pwd;

        var hasEmpty = [accountName, accountPwd, rePwd].some(function(item) {
            if (item === '') {
                return true;
            }
        });

        var hasDiff = (function() {
            return accountPwd !== rePwd;
        })();

        if (hasEmpty) {
            res.render('sign/signup', { success: false, info: '数据不完整！' });
            return;
        }

        if (hasDiff) {
            res.render('sign/signup', { success: false, info: '密码不一致！' });
            return;
        }

        userModel.create({
            account_name: accountName,
            account_pwd: crypto.createHash('md5').update(accountPwd).digest('hex')
        }).then(function() {
            res.render('sign/signup', { success: true, info: '注册成功！' });
        }).catch(function(err) {
            res.render('sign/signup', { success: false, info: '数据格式错误' });
        });
    },
    signin: function(req, res) {
        // 获取数据
        var accountName = req.body.account_name;
        var accountPwd = req.body.account_pwd;

        // 验证数据
        var hasEmpty = [accountName, accountPwd].some(function(item) {
            return item === '' ? true : false;
        });

        if (hasEmpty) {
            res.render('sign/signin', { success: false, info: '数据输入不完整' });
            return;
        }

        userModel.findOne({
        	where: {account_name: accountName},
        	attributes: ['account_name', 'account_pwd']
        }).then(function(account) {

        	var pwd = crypto.createHash('md5').update(accountPwd).digest('hex')

        	if(account && account.dataValues.account_pwd === pwd) {
        		req.session.sign = true;
        		req.session.account = account.dataValues;
        		res.redirect('/user/');
        		return;
        	}

        	res.render('sign/signin', {success: false, info: '用户不存在'});
        });
    },
    signout: function(req, res) {
    	req.session.destroy();
    	res.redirect('/');
    }
};

module.exports = signController;
