/**
 * 文章
 */

var dbAccess = require('../lib/dbAccess');

var entityName = 'Article';

function Article(article) {
	this.articleId = article.articleId;
	this.userId = article.userId;
	this.articleHead = article.articleHead;
	this.articleTime = article.articleTime;
	this.articleContent = article.articleContent;
	this.articleRead = article.articleRead;
	this.articleComment = article.articleComment;
}
module.exports = Article;

Article.prototype.save = function(callback) {
	dbAccess.save(this, callback);
};

Article.prototype.update = function(callback) {
	dbAccess.update(this, callback);
};

Article.getById = function(articleId, callback) {
	dbAccess.getById(entityName, articleId, callback);
};

Article.deleteById = function(articleId, callback) {
	dbAccess.deleteById(entityName, articleId, callback);
};

Article.list = function(pageNo, pageSize, callback) {
	dbAccess.list(entityName, pageNo, pageSize, callback);
};