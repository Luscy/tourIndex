/**
 * 前台百度地图页逻辑处理
 */

var dbAccess = require('../../lib/dbAccess');
var query = require('../../lib/queryBuilder').query;

exports.get = function(req, res) {
	res.render('tour/strategy-map', {
		nav: 'strategy'
	});
};

exports.queryViews = function(req, res) {
	var myQuery = new query('View');
	
	var ids = req.query.ids;
	var arr = ids.split('-');
	for (var i in arr) {
		var id = parseInt(arr[i]);
		myQuery.eq('viewId', id, true);
	}
	
	dbAccess.query(myQuery, function(views) {
		res.json({ list: views });
	});
};