/**
 * 前台攻略页逻辑处理
 */

var dbAccess = require('../../lib/dbAccess');
var query = require('../../lib/queryBuilder').query;

exports.get = function(req, res) {
	res.render('tour/strategy', {
		nav: 'strategy'
	});
};

exports.queryViews = function(req, res) {
	var cityId = parseInt(req.query.cityId);
	var viewCateId = parseInt(req.query.viewCateId);
	var viewName = req.query.viewName;
	
	var myQuery = new query('View');
	if (cityId > 0) {
		myQuery.eq('cityId', cityId);
	}
	if (viewCateId > 0) {
		myQuery.eq('viewCateId', viewCateId);
	}
	if (viewName) {
		myQuery.like('viewName', viewName);
	}
	
	dbAccess.query(myQuery, function(views) {
		res.json({ list: views });
	});
};