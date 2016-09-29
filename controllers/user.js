var userModel = require('../models/user.js');

// var ep = new eventproxy();

var userController = {
    findAll: function(req, res) {
        userModel.findAll().then(function(users) {
            res.json({success: true, data: users});
        });
    },
    createUser: function(req, res) {
        var accountname = req.body.username;
        var accountpwd = req.body.userpwd;

        var hasEmpty = [accountname, accountpwd].some(function(item) {
            if (item === '') {
                return true;
            }
        });

        if (hasEmpty) {
            res.json({ success: false, info: '数据不能为空！' });
            return;
        }

        userModel.create({
            account_name: accountname,
            account_pwd: accountpwd
        }).then(function() {
            res.json({ 'success': true, info: '添加用户成功！' });
        }).catch(function(error) {
            if (error) {
                res.json({ success: false, info: error });
                return;
            }
        });
    },
    findOneById: function(req, res) {
        var id = req.params.id;
        console.log(id);
        userModel.findById(id).then(function(user) {
            res.json(user);
        });
    },
    hasUser: function(req, res) {
        console.log(req.body);
        var accountName = req.body.account_name;
        userModel.findOne({
            where: {account_name: accountName},
            attributes: ['account_name']
        }).then(function(item) {
            if(item) {
                res.json({success: true});
                return;
            }
            res.json({success: false});
        });
    }
};

module.exports = userController;
