var JourItem = require('../models/jourItem');

function save() {
	var jourItem = new JourItem({
		jourId: 1,
		jourItemDate: '2015-01-01  星期一',
		cityId: 1,
		jourItemLine: 'jourItemLine1'
	});
	jourItem.save(function() {
		console.log('子行程保存成功');
	});
}

function update() {
	var jourItem = new JourItem({
		jourItemId: 1,
		jourId: 2,
		jourItemDate: '2015-02-02 星期二',
		cityId: 2,
		jourItemLine: 'jourItemLine2'
	});
	jourItem.update(function() {
		console.log('子行程修改成功');
	});
}

function getById() {
	JourItem.getById(1, function(jourItem) {
		if (jourItem) {
			console.log(jourItem);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

function getByJourId() {
	JourItem.getByJourId(1, function(jourItems) {
		console.log(jourItems);
	});
}

function deleteById() {
	JourItem.deleteById(2, function(result) {
		if (result.affectedRows > 0) {
			console.log('子行程删除成功');
		} else {
			console.log('子行程删除失败');
		}
		console.log(result);
	});
}

for (var i = 0; i < 10; i++) {
	//save();
}
//update();
//getById();
//getByJourId();
//deleteById();