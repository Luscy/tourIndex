/**
 * 子行程
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'JourItem';

function JourItem(jourItem) {
	this.jourItemId = jourItem.jourItemId;
	this.jourId = jourItem.jourId;
	this.jourItemDate = jourItem.jourItemDate;
	this.cityId = jourItem.cityId;
	this.jourItemLine = jourItem.jourItemLine;
}
module.exports = JourItem;

JourItem.prototype.save = function(callback) {
	dbAccess.save(this, callback);
};

JourItem.prototype.update = function(callback) {
	dbAccess.update(this, callback);
};

JourItem.getById = function(jourItemId, callback) {
	dbAccess.getById(entityName, jourItemId, callback);
};

JourItem.getByJourId = function(jourId, callback) {
	dbAccess.listByColumn(entityName, 'jourId', jourId, callback);
};

JourItem.deleteById = function(jourItemId, callback) {
	dbAccess.deleteById(entityName, jourItemId, callback);
};