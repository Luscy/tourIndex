var ViewCate = require('../models/viewCate');

function list() {
	ViewCate.list(1, 10, function(pagination) {
		console.log(pagination);
	});
}

list();