/**
 * 百度API
 */

var request = require('request');
var dbAccess = require('../../lib/dbAccess');
var query = require('../../lib/queryBuilder').query;

/**
 * 交换经纬度
 */
var swapping = function(mapPoint) {
	var arr = mapPoint.split(',');
	return arr[1] + ',' + arr[0];
};

exports.direction = function(req, res) {
	var viewId1 = parseInt(req.query.viewId1);
	var viewId2 = parseInt(req.query.viewId2);
	var city = req.query.city;
	var myQuery = new query('View');
	myQuery.eq('viewId', viewId1, true);
	myQuery.eq('viewId', viewId2, true);
	
	dbAccess.query(myQuery, function(views) {
		var url = 'http://api.map.baidu.com/direction/v1?mode=transit'
			+ '&origin=' + swapping(views[0].mapPoint) 
			+ '&destination=' + swapping(views[1].mapPoint)
			+ '&region=' + encodeURIComponent(city)
			+ '&output=json&ak=C2a56d5bc0bcbe0bd6a396c6c971ba73';
		request(url, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body);
				var scheme = data.result.routes[0].scheme[0];
				res.json({ distance: scheme.distance, duration: scheme.duration });
			} else {
				res.json({ error: true });
			}
		});
	});
};