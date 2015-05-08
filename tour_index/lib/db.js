/**
 * 数据库工具
 */

var db_settings = require('./settings').db;

var mysql = require('mysql');
var pool = mysql.createPool({
	host: db_settings.host,
	user: db_settings.user,
	password: db_settings.password,
	database: db_settings.database,
	port: db_settings.port
});

/**
 * 释放数据库连接
 */
exports.release = function(connection) {
	connection.end(function(error) {
		console.log('Connection closed');
	});
};

/**
 * 执行查询
 */
exports.execQuery = function(options) {
	pool.getConnection(function(error, connection) {
		if(error) {
			console.log('DB-获取数据库连接异常！');
			//throw error;
		}

		// 查询参数
		var sql = options['sql'].toLowerCase();
		var args = options['args'];
		var handler = options['handler'];

		var query;
		// 执行查询
		if (!args) {
			query = connection.query(sql, function(error, results) {
				if (error) {
					console.error('DB-执行查询语句异常！');
					//throw error;
				}
				handler(results); // 处理结果
			});
			console.log(query.sql);
		} else {
			query = connection.query(sql, args, function(error, results) {
				if (error) {
					console.error('DB-执行查询语句异常！');
					//throw error;
				}
				handler(results); // 处理结果
			});
			console.log(query.sql);
		}

		// 返回连接池
		connection.release(function(error) {
			if (error) {
				console.error('DB-关闭数据库连接异常！');
				//throw error;
			}
		});
	});
};