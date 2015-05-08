var Jour = require('../models/jour');

function save() {
	var jour = new Jour({
		userId: 1,
		jourDesc: 'jourDesc1'
	});
	jour.save(function() {
		console.log('行程保存成功');
	});
}

function update() {
	var jour = new Jour({
		jourId: 1,
		userId: 2,
		jourDesc: 'jourDesc2'
	});
	jour.update(function() {
		console.log('行程修改成功');
	});
}

function getById() {
	Jour.getById(1, function(jour) {
		if (jour) {
			console.log(jour);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

function getByUserId() {
	Jour.getByUserId(1, function(jours) {
		console.log(jours);
	});
}

function deleteById() {
	Jour.deleteById(2, function(result) {
		if (result.affectedRows > 0) {
			console.log('行程删除成功');
		} else {
			console.log('行程删除失败');
		}
		console.log(result);
	});
}

for (var i = 0; i < 10; i++) {
	//save();
}
//update();
//getById();
//getByUserId();
deleteById();