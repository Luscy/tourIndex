/**
 * 前台导航栏逻辑处理
 * 包含获取注册/登录页和退出登录功能
 */

exports.login = function(req, res) {
	res.render('tour/login', {
		referer: req.headers.referer
	});
};

exports.logout = function(req, res) {
	req.session.user = null;
	res.cookie(USER_COOKIE_KEY, null, { maxAge: -1 });
	res.redirect(req.headers.referer);
};