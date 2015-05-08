/**
 * 配置
 */

/**
 * 数据库配置
 */
exports.db = {
	host: '127.0.0.1',
	user: 'root',
	password: '123',
	database:'tour',
	port: 3306
};

/**
 * session配置
 */
exports.session = {
	name: 'SESSIONID',
	secret: 'xlx@#$LKJ',
	resave: false,
	saveUninitialized: false
};

/**
 * aes密钥配置
 */
exports.aes = {
	key: 'xlx!@#ZXC'
};
