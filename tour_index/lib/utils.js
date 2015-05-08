/**
 * 工具类
 */

var crypto = require('crypto');
var aes_settings = require('./settings').aes;

/** 
 * MD5加密 
 * @param data 
 * @returns {*} 
 */
exports.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
};

/**
 * aes对象：封装了加密和解密算法
 */
exports.aes = {
	encrypt: function(plaintext) {
		var cipher = crypto.createCipher('aes-256-cbc', aes_settings.key);
		var ciphertext = cipher.update(plaintext, 'utf8', 'hex');
		ciphertext += cipher.final('hex');
		return ciphertext;
	},
	decrypt: function(ciphertext) {
		var decipher = crypto.createDecipher('aes-256-cbc', aes_settings.key);
		var plaintext = decipher.update(ciphertext, 'hex', 'utf8');
		plaintext += decipher.final('utf8');
		return plaintext;
	}
};

/**
 * 首字母小写
 */
exports.toFirstLetterLowerCase = function(str) {
	return str.substring(0, 1).toLowerCase() + str.substring(1, str.length);
};

/**
 * 首字母大写
 */
exports.toFirstLetterUpperCase = function(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
};

/**
 * 获取指定长度的实际字符串
 */
exports.randomString = function(len) {
	len = len || 32;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var maxPos = chars.length;
	var str = '';
	for (var i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return str;
};

