var express = require('express'),
	app = express(),
	path = require('path'),
	engine = require('ejs-mate'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	logger = require('morgan'),
	web_router = require('./routers/web_router.js'),
	user = require('./routers/api/user.js'),
	db = require('./db.js');

//view engine set
app.engine('html', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'sequelizeSrc', //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false, //
}));
app.use('/public', express.static('public'));

app.use(function(req,res,next){
	res.locals.current_user = req.session.sign;
	next();
});

app.use('',web_router);
app.use('/api/v0.1/user', user);

var sequelize = db.sequelize;
//{force: true}
sequelize.sync({force: false}).then(function () {
  var server = app.listen(3000);
});