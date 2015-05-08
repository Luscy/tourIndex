/**
 * 前台首页逻辑处理
 */

var dbAccess = require('../../lib/dbAccess');

exports.get = function(req, res) {
	res.render('tour/index', {
		nav: 'index'
	});
};

exports.hotViews = function(req, res) {
	dbAccess.listByColumn('View', 'hot', 1, function(pagination) {
		res.json({ list: pagination.list });
	}, 1, 4);
};

exports.cityViews = function(req, res) {
	var cityId = req.query.cityId;
	dbAccess.listByColumn('View', 'cityId', cityId, function(pagination) {
		res.json({ list: pagination.list });
	}, 1, 3);
};