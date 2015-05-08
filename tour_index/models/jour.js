/**
 * 行程
 */

var db = require("../lib/db");
var dbAccess = require('../lib/dbAccess');
var JourItem = require("./jourItem");

var entityName = 'Jour';

function Jour(jour) {
	this.jourId = jour.jourId;
	this.userId = jour.userId;
	this.jourDesc = jour.jourDesc;
}
module.exports = Jour;

Jour.prototype.save = function(callback) {
	dbAccess.save(this, callback);
};

Jour.prototype.update = function(callback) {
	dbAccess.update(this, callback);
};

Jour.getById = function(jourId, callback) {
	dbAccess.getById(entityName, jourId, callback);
};

Jour.getByUserId = function(userId, callback) {
	dbAccess.listByColumn(entityName, 'userId', userId, callback);
};

Jour.deleteById = function(jourId, callback) {
	dbAccess.casDelete('JourItem', 'jourId', jourId, function() { // 级联删除子行程
		console.log("级联删除行程[" + jourId + "]的子行程");
	});
	dbAccess.deleteById(entityName, jourId, callback);
};