var User = require('../models/user');

function save() {
	var user = new User({
		userMail: '123@123.com',
		userName: '小罗杏',
		userPassword: 'p33441',
		userSex: '女',
		userSignTime: new Date(),
		userImageUrl: 'image1'
	});
	user.save(function() {
		console.log('用户保存成功');
	});
}

function update() {
	var user = new User({
		userId: 1,
		userMail: '456@123.com',
		userName: '小葱',
		userPassword: 'p33442',
		userSex: '男',
		userSignTime: new Date(),
		userImageUrl: 'image2'
	});
	user.update(function() {
		console.log('用户修改成功');
	});
}

function getByUserMail() {
	User.getByUserMail('456@123.com', function(user) {
		if (user) {
			console.log(user);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

function getByUserName() {
	User.getByUserName('小罗杏', function(user) {
		if (user) {
			console.log(user);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

//save();
//update();
//getByUserMail();
getByUserName();