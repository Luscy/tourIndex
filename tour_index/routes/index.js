/**
 * 路由控制
 */

var tour = require('./tour');
//var admin = require('./admin');

module.exports = function(app) {
	tour(app);
//	admin(app);
};