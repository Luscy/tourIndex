var City = require('../models/city');

function list() {
	City.list(1, 10, function(pagination) {
		console.log(pagination);
	});
}

list();