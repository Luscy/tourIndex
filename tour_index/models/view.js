/**
 * 景点
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'View';

function View(view) {
	this.viewId = view.viewId;
	this.viewName = view.viewName;
	this.viewAddress = view.viewAddress;
	this.viewCateId = view.viewCateId;
	this.hotelIds = view.hotelIds;
	this.viewIntro = view.viewIntro;
	this.viewWeather = view.viewWeather;
	this.viewCustom = view.viewCustom;
	this.viewTraf = view.viewTraf;
	this.ticketPrice = view.ticketPrice;
	this.viewImageUrl = view.viewImageUrl;
	this.cityId = view.cityId;
	this.hot = view.hot;
	this.count = view.count;
	this.ticketUrl = view.ticketUrl;
	this.mapPoint = view.mapPoint;
}
module.exports = View;

View.prototype.save = function(callback) {
	dbAccess.save(this, callback);
};

View.prototype.update = function(callback) {
	dbAccess.update(this, callback);
};

View.getById = function(viewId, callback) {
	dbAccess.getById(entityName, viewId, callback);
};

View.deleteById = function(viewId, callback) {
	dbAccess.deleteById(entityName, viewId, callback);
};

View.list = function(pageNo, pageSize, callback) {
	dbAccess.list(entityName, pageNo, pageSize, callback);
};