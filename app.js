var express = require('express'),
	app = express(),
	path = require('path'),
	engine = require('ejs-mate'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	web_router = require('./routers/web_router.js'),
	user = require('./routers/user.js'),
	db = require('./db.js');

//view engine set
app.engine('html', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));

app.use('',web_router);
app.use('/api/v0.1/user', user);

var sequelize = db.sequelize;
//{force: true}
sequelize.sync({force: false}).then(function () {
  var server = app.listen(3001);
});