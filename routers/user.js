var express = require('express');
var router = express.Router();
var userCtr = require('../controllers/user.js');

router.use(function(req, res, next) {
	console.log('Time:' + Date.now());
	next();
});

router.get('/findAll', userCtr.findAll);
router.post('/createUser', userCtr.createUser);
router.get('/findOneById/:id', userCtr.findOneById);

module.exports = router;