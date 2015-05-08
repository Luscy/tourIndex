/**
 * 前台景点情页逻辑处理
 */

var View = require("../../models/view");
var City = require("../../models/city");

exports.get = function(req, res) {
	var id = parseInt(req.params.id);
	if (id > 0) {
		View.getById(id, function(view) {
			if (view) {
				City.getById(view.cityId, function(city) {
					res.render('tour/sight-detail', {
						nav: 'strategy',
						view: view,
						city: city
					});
				});
			} else {
				res.render('tour/index', {
					nav: 'strategy'
				});
			}
		});
	} else {
		res.render('tour/index', {
			nav: 'strategy'
		});
	}
};