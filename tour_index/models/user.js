/**
 * 用户
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'User';

function User(user) {
	this.userId = user.userId;
	this.userMail = user.userMail;
	this.userName = user.userName;
	this.userPassword = user.userPassword;
	this.userSex = user.userSex;
	this.userSignTime = user.userSignTime;
	this.userImageUrl = user.userImageUrl;
}
module.exports = User;

User.prototype.save = function(callback) {
	dbAccess.save(this, callback);
};

User.prototype.update = function(callback) {
	dbAccess.update(this, callback);
};

User.getByUserMail = function(userMail, callback) {
	dbAccess.getByColumn(entityName, 'userMail', userMail, callback);
};

User.getByUserName = function(userName, callback) {
	dbAccess.getByColumn(entityName, 'userName', userName, callback);
};
