/**
 * 获取景点信息
 */

var View = require("../../models/view");

exports.get = function(req, res) {
	var viewId = parseInt(req.query.viewId);
	View.getById(viewId, function(view) {
		res.json({ view: view });
	});
};