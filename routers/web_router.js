var express = require('express');
var router = express.Router();
var signCtr = require('../controllers/sign.js');

router.get('/', function(req, res) {
	res.render('index');
});

// 注册页面
router.get('/signup', function(req, res) {
	res.render('sign/signup');
});

router.post('/signup', signCtr.signup);

module.exports = router;