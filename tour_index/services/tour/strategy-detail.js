/**
 * 前台攻略详情页逻辑处理
 */

exports.get = function(req, res) {
	res.render('tour/strategy-detail', {
		nav: 'strategy'
	});
};