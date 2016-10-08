var express = require('express');
var router = express.Router();
var signCtr = require('../controllers/sign.js');
var userCtr = require('../controllers/user.js');
var categoryCtr = require('../controllers/category.js');
router.get('/', function(req, res) {
	res.render('index');
});

// 注册页面
router.get('/signup', function(req, res) {
	res.render('sign/signup');
});

router.post('/signup', signCtr.signup);

// 登录页面
router.get('/signin', function(req, res) {
	res.render('sign/signin');
});

router.post('/signin', signCtr.signin);

// 登出
router.get('/signout', signCtr.signout);

// 用户首页
router.get('/user/', function(req, res) {
	res.render('user/index');
});

// 用户设置
router.get('/user/setting', userCtr.setting);

// 添加分类
router.get('/addCategory', categoryCtr.index);

// 添加分类
router.post('/addCategory', categoryCtr.addCategory);

module.exports = router;