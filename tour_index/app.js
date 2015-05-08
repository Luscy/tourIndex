/**
 * 项目启动文件
 */

var express = require('express');
var partials = require('express-partials');
var session = require('express-session');
var routes = require('./routes');
var session_settings = require('./lib/settings').session;
var http = require('http');

var app = express();

require('./lib/init'); // 加载项目初始化模块

// 所有环境
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials()); // 让视图可以继承layout
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({ uploadDir: './uploads' })); // 上传文件到默认的文件夹（uploads）下
app.use(express.methodOverride());
app.use(express.cookieParser()); // 读取浏览器发送过来的cookie
app.use(session({ // 支持session
	name: session_settings.name,
	secret: session_settings.secret,
	resave: session_settings.resave,
	saveUninitialized: session_settings.saveUninitialized
}));
app.use(function(req, res, next) { // 支持在ejs中访问session
	res.locals.session = req.session;
	next();
});
app.use(express.static(__dirname, '/public'));

routes(app); // 路由控制

// 开发环境
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});