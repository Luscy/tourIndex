/**
 * 前台路由控制
 */

var utils = require('../lib/utils');
var User = require('../models/user');

var tour_navigator = require('../services/tour/navigator');
var tour_login = require('../services/tour/login');
var tour_index = require('../services/tour/index');
var tour_sight_detail = require('../services/tour/sight-detail');
var tour_strategy = require('../services/tour/strategy');
var tour_strategy_detail = require('../services/tour/strategy-detail');
var tour_view = require('../services/common/view');
var tour_strategy_map = require('../services/tour/strategy-map');
var tour_baidu_api = require('../services/common/baidu-api');

var checkLogin = function(req, res, next) {
	if (!req.session.user) {
		var tu = req.cookies[USER_COOKIE_KEY];
		if (tu) {
			var userMail = utils.aes.decrypt(tu);
			User.getByUserMail(userMail, function(user) {
				if (user) {
					req.session.user = user;
					next();
				} else {
					return res.redirect('/tour/login');
				}
			});
		} else {
			return res.redirect('/tour/login');
		}
	} else {
		next();
	}
};

var checkNotLogin = function(req, res, next) {
	if (req.session.user) {
		return res.redirect('/tour');
	} else {
		var tu = req.cookies[USER_COOKIE_KEY];
		if (tu) {
			var userMail = utils.aes.decrypt(tu);
			User.getByUserMail(userMail, function(user) {
				if (user) {
					req.session.user = user;
					return res.redirect('/tour');
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
};

var paraseCookie = function(req, res, next) {
	if (!req.session.user) {
		var tu = req.cookies[USER_COOKIE_KEY];
		if (tu) {
			var userMail = utils.aes.decrypt(tu);
			User.getByUserMail(userMail, function(user) {
				if (user) {
					req.session.user = user;
				}
				next();
			});
		} else {
			next();
		}
	} else {
		next();
	}
};

module.exports = function(app) {
	app.get('/tour/login', checkNotLogin);
	app.get('/tour/login', tour_navigator.login);
	app.get('/tour/logout', checkLogin);
	app.get('/tour/logout', tour_navigator.logout);
	
	app.post('/tour/signup', checkNotLogin);
	app.post('/tour/signup', tour_login.signup);
	app.post('/tour/signin', checkNotLogin);
	app.post('/tour/signin', tour_login.signin);
	app.get('/tour/rememberMe', tour_login.rememberMe);
	
	app.get('/tour/view', tour_view.get);
	
	app.get('/tour', paraseCookie);
	app.get('/tour', tour_index.get);
	app.get('/tour/hotViews', tour_index.hotViews);
	app.get('/tour/cityViews', tour_index.cityViews);
	
	app.get('/tour/sight-detail/:id', tour_sight_detail.get);
	
	app.get('/tour/strategy', tour_strategy.get);
	app.get('/tour/strategy/queryViews', tour_strategy.queryViews);
	
	app.get('/tour/strategy-detail', tour_strategy_detail.get);
	
	app.get('/tour/strategy-map', tour_strategy_map.get);
	app.get('/tour/strategy-map/queryViews', tour_strategy_map.queryViews);
	
	app.get('/tour/baidu-api/direction', tour_baidu_api.direction);
};

