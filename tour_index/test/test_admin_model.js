var Admin = require('../models/admin');

function getByAdminName() {
	Admin.getByAdminName('admin', function(admin) {
		if (admin) {
			console.log(admin);
		} else {
			console.log('没有找到相关记录');
		}
	});
}

getByAdminName();