/**
 * 基础数据接口
 */

var db = require('./db');
var queryBuilder = require('./queryBuilder');
var utils = require('./utils');

var tableSuffix = 'Tab';
var idSuffix = 'Id';

/**
 * 保存实体
 */
exports.save = function(entity, callback) {
	var entityName = entity.constructor.name;
	var tableName = entityName + tableSuffix;
	var newObject = {};
	for (var i in entity) {
		console.log(i);
		if(entity.hasOwnProperty(i)) {
			newObject[i] = entity[i];
		}
	}
	var param = queryBuilder.getSaveParam(tableName, newObject);
	db.execQuery({
		sql: param.sql,
		args: param.args,
		handler: callback
	});
};

/**
 * 更新实体
 */
exports.update = function(entity, callback) {
	var entityName = utils.toFirstLetterLowerCase(entity.constructor.name);
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	var newObject = {};
	for (var i in entity) {
		if(entity.hasOwnProperty(i)) {
			newObject[i] = entity[i];
		}
	}
	var param = queryBuilder.getUpdateParam(tableName, entityId, newObject);
	db.execQuery({
		sql: param.sql,
		args: param.args,
		handler: callback
	});
};

/**
 * 根据id获取实体
 */
exports.getById = function(entityName, id, callback) {
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	db.execQuery({
		sql: 'select * from ' + tableName + ' where ' + entityId + '=?',
		args: [id],
		handler: function(rows) {
			if (rows) {
				callback(rows[0]);
			} else {
				callback();
			}
		}
	});
};

/**
 * 根据id删除实体
 */
exports.deleteById = function(entityName, id, callback) {
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	db.execQuery({
		sql: 'delete from ' + tableName + ' where ' + entityId + '=?',
		args: [id],
		handler: callback
	});
};

/**
 * 级联删除
 */
exports.casDelete = function(entityName, parentIdName, parentIdValue, callback) {
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	db.execQuery({
		sql: 'select ' + entityId + ' from ' + tableName + ' where ' + parentIdName + '=?',
		args: [parentIdValue],
		handler: function(rows) {
			for (var i in rows) {
				if(rows.hasOwnProperty(i)) {
					exports.deleteById(entityName, rows[i][entityId], callback);
				}
			}
		}
	});
};

/**
 * 根据某一列获取实体：只返回拿到的第一个实体
 */
exports.getByColumn = function(entityName, columnName, columnValue, callback) {
	db.execQuery({
		sql: 'select * from ' + (entityName + tableSuffix) + ' where ' + columnName + '=?',
		args: [columnValue],
		handler: function(rows) {
			if (rows) {
				callback(rows[0]);
			} else {
				callback();
			}
		}
	});
};

/**
 * 创建分页对象
 */
var buildPagination = function(pageNo, pageSize, count) {
	var pagination = {
		pageNo: pageNo,
		pageSize: pageSize,
		total: count,
		pageCount: Math.ceil(count / pageSize),
		hasPrevious: pageNo > 1,
		hasNext: Math.ceil(count / pageSize) > pageNo
	};
	return pagination;
};

/**
 * 获取分页实体
 */
exports.list = function(entityName, pageNo, pageSize, callback) {
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	db.execQuery({
		sql: 'select count(*) as count from ' + tableName,
		handler: function(result) {
			var start = (pageNo - 1) * pageSize;
			var count = result[0].count;
			var pagination = buildPagination(pageNo, pageSize, count);
			if (start < count) {
				db.execQuery({
					sql : 'select * from ' + tableName + ' order by '
							+ entityId + ' desc limit ' + start + ', '
							+ pageSize,
					handler: function(rows) {
						pagination.list = rows;
						callback(pagination);
					}
				});
			} else {
				pagination.list = [];
				callback(pagination);
			}
		}
	});
};

/**
 * 根据某一列获取分页实体
 */
exports.listByColumn = function(entityName, columnName, columnValue, callback, pageNo, pageSize) {
	var tableName = entityName + tableSuffix;
	var entityId = entityName + idSuffix;
	if (pageNo && pageSize) {
		db.execQuery({
			sql: 'select count(*) as count from ' + tableName + ' where ' + columnName + '=?',
			args: [columnValue],
			handler: function(result) {
				var start = (pageNo - 1) * pageSize;
				var count = result[0].count;
				var pagination = buildPagination(pageNo, pageSize, count);
				if (start < count) {
					db.execQuery({
						sql : 'select * from ' + tableName + ' where '
								+ columnName + '=? order by ' + entityId
								+ ' desc limit ' + start + ', ' + pageSize,
						args: [columnValue],
						handler: function(rows) {
							pagination.list = rows;
							callback(pagination);
						}
					});
				} else {
					pagination.list = [];
					callback(pagination);
				}
			}
		});
	} else {
		db.execQuery({
			sql : 'select * from ' + tableName + ' where ' + columnName
					+ '=? order by ' + entityId + ' desc',
			args: [columnValue],
			handler: callback
		});
	}
};

/**
 * 用query工具建立的多条件查询
 */
exports.query = function(query, callback) {
	db.execQuery({
		sql : query.sql,
		args: query.args,
		handler: callback
	});
};

