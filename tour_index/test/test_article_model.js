var Article = require('../models/article');

function save() {
	var article = new Article({
		userId: 1,
		articleHead: 'articleHead1',
		articleTime: new Date(),
		articleContent: 'articleContent1',
		articleRead: 0,
		articleComment: 0
	});
	article.save(function() {
		console.log('文章保存成功');
	});
}

function update() {
	var article = new Article({
		articleId: 1,
		userId: 2,
		articleHead: 'articleHead2',
		articleTime: new Date(),
		articleContent: 'articleContent2',
		articleRead: 2,
		articleComment: 2
	});
	article.update(function() {
		console.log('文章更新成功');
	});
}

function getById() {
	Article.getById(1, function(article) {
		if (article) {
			console.log(article);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

function deleteById() {
	Article.deleteById(2, function(result) {
		if (result.affectedRows > 0) {
			console.log('文章删除成功');
		} else {
			console.log('文章删除失败');
		}
		console.log(result);
	});
}

function list() {
	Article.list(1, 10, function(pagination) {
		console.log(pagination);
	});
}

for (var i = 0; i < 10; i++) {
	//save();
}
//update();
//getById();
//deleteById();
list();