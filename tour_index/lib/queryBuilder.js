/**
 * 数据库请求创建工具
 */

/**
 * 获取保存实体的sql和参数
 */
exports.getSaveParam = function(tableName, entity) {
	//sql:insert into viewtab(viewId,viewName...) values(?,?...)
	var sql1 = 'insert into ' + tableName + '(';
	var sql2 = ') values(';
	var args = [];
	for (var key in entity) {
		if (entity.hasOwnProperty(key)) {
			var value = entity[key];
			if (value) {
				sql1 += key + ',';
				sql2 += '?,';
				args.push(value);
			}
		}
	}
	var sql = sql1.substring(0, sql1.length - 1) + sql2.substring(0, sql2.length - 1) + ')';
	var param = {
		sql: sql,
		args: args
	};
	return param;
};

/**
 * 获取更新实体的sql和参数
 */
exports.getUpdateParam = function(tableName, columnName, entity) {
	var sql1 = 'update ' + tableName + ' set ';
	var args = [];
	for (var key in entity) {
		if (entity.hasOwnProperty(key)) {
			var value = entity[key];
			if (value && key !== columnName) {
				sql1 += key + '=?,';
				args.push(value);
			}
		}
	}
	var sql = sql1.substring(0, sql1.length - 1) + ' where ' + columnName + '=' + entity[columnName];
	var param = {
		sql: sql,
		args: args
	};
	return param;
};

/**
 * 建立多条件查询的工具
 */
exports.query = function(entityName) {
	this.sql = 'select * from ' + entityName + 'Tab';
	this.args = [];
	
	var index = 0;
	
	this.eq = function(columnName, value, isOr) {
		if (index === 0) {
			this.sql += ' where ' + columnName + '=' + value;
		} else {
			if (!isOr) {
				this.sql += ' and ' + columnName + '=' + value;
			} else {
				this.sql += ' or ' + columnName + '=' + value;
			}
		}

		this.args[index] = value;
		index++;
		
		return this;
	};
	
	this.like = function(columnName, value, isOr) {
		if (index === 0) {
			this.sql += ' where ' + columnName + ' like \'%' + value + '%\'';
		} else {
			if (!isOr) {
				this.sql += ' and ' + columnName + ' like \'%' + value + '%\'';
			} else {
				this.sql += ' or ' + columnName + ' like \'%' + value + '%\'';
			}
		}
		
		this.args[index] = value;
		index++;
		
		return this;
	};
};