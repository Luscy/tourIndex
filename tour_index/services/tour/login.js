/**
 * 前台登录页逻辑处理
 */

var utils = require("../../lib/utils");
var User = require("../../models/user");

exports.signup = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var repassword = req.body.repassword;
	if (email === '' || password === '' || repassword === '' || password !== repassword) {
		res.json({ error: '参数输入 不正确' });
		return ;
	}
	User.getByUserMail(email, function(user) {
		if (user) {
			res.json({ error: '该邮箱已注册' });
			return ;
		}
		var newUser = new User({
			userMail: email,
			userPassword: utils.md5(password),
			userSignTime: new Date()
		});
		newUser.save(function(result) {
			if (result.affectedRows === 1) {
				//var userId = result.insertId;
				res.json({ success: '注册成功' });
			} else {
				res.json({ error: '注册失败' });
			}
		});
	});
};

exports.signin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email === '' || password === '') {
		res.json({ error: '参数输入 不正确' });
		return ;
	}
	User.getByUserMail(email, function(user) {
		if (!user) {
			res.json({ error: '账号不存在' });
			return ;
		}
		password = utils.md5(password);
		if (user.userPassword !== password) {
			res.json({ error: '密码错误' });
			return ;
		}
		req.session.user = user;
		res.json({ success: true });
	});
};

/**
 * 如果用户选择了“记住我”，则将用户名保存到cookie中，否则不保存
 */
exports.rememberMe = function(req, res) {
	if (req.session.user) {
		res.cookie(USER_COOKIE_KEY, utils.aes.encrypt(req.session.user.userMail),
				{ maxAge: 30 * 24 * 60 * 60 * 1000 }); // 保存30天
		res.json({ success: true });
	} else {
		res.json({ error: true });
	}
};