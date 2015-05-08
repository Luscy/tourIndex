/**
 * 线路
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'Line';

function Line(line) {
	this.lineId = line.lineId;
	this.cityId = line.cityId;
	this.lineContent = line.lineContent;
}
module.exports = Line;

Line.getByCityId = function(cityId, callback) {
	dbAccess.listByColumn(entityName, 'cityId', cityId, callback);
};