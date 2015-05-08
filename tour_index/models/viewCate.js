/**
 * 景点类别
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'ViewCate';

function ViewCate(viewCate) {
	this.viewCateId = viewCate.viewCateId;
	this.viewCateName = viewCate.viewCateName;
	this.viewCateIntro = viewCate.viewCateIntro;
}
module.exports = ViewCate;

ViewCate.getById = function(viewCateId, callback) {
	dbAccess.getById(entityName, viewCateId, callback);
};

ViewCate.list = function(pageNo, pageSize, callback) {
	dbAccess.list(entityName, pageNo, pageSize, callback);
};