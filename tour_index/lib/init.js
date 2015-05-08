/**
 * 做一些初始化工作，添加为js原生类型添加方法
 */

module.exports = (function() {
	String.prototype.startWith = function(str) {
		var reg = new RegExp("^" + str);
		return reg.test(this);
	};

	String.prototype.endWith = function(str) {
		var reg = new RegExp(str + "$");
		return reg.test(this);
	};
	
	require('./constant');
})();
