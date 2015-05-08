/**
 * 城市
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'City';

function City(city) {
	this.cityId = city.cityId;
	this.cityName = city.cityName;
	this.cityImageUrl = city.cityImageUrl;
}
module.exports = City;

City.getById = function(cityId, callback) {
	dbAccess.getById(entityName, cityId, callback);
};

City.list = function(pageNo, pageSize, callback) {
	dbAccess.list(entityName, pageNo, pageSize, callback);
};