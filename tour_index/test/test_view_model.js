var View = require('../models/view');

function save() {
	var view = new View({
		viewName: 'viewName1',
		viewAddress: 'viewAddress1',
		viewCateId: 1,
		hotelIds: 'hotelIds1',
		viewIntro: 'viewIntro1',
		viewWeather: 'viewWeather1',
		viewCustom: 'viewCustom1',
		viewTraf: 'viewTraf1',
		ticketPrice: 100,
		viewImageUrl: 'viewImageUrl1',
		cityId: 3
	});
	view.save(function() {
		console.log('景点保存成功');
	});
}

function update() {
	var view = new View({
		viewId: 1,
		viewName: 'viewName2',
		viewAddress: 'viewAddress2',
		viewCateId: 4,
		hotelIds: 'hotelIds2',
		viewIntro: 'viewIntro2',
		viewWeather: 'viewWeather2',
		viewCustom: 'viewCustom2',
		viewTraf: 'viewTraf2',
		ticketPrice: 200,
		viewImageUrl: 'viewImageUrl2',
		cityId: 6
	});
	view.update(function() {
		console.log('景点更新成功');
	});
}

function getById() {
	View.getById(1, function(view) {
		if (view) {
			console.log(view);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

function deleteById() {
	View.deleteById(2, function(result) {
		if (result.affectedRows > 0) {
			console.log('景点删除成功');
		} else {
			console.log('景点删除失败');
		}
		console.log(result);
	});
}

function list() {
	View.list(1, 10, function(pagination) {
		console.log(pagination);
	});
}

for (var i = 0; i < 10; i++) {
	//save();
}
update();
//getById();
//deleteById();
list();