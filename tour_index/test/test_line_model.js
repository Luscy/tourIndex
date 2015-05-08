var Line = require('../models/line');

function getByCityId() {
	Line.getByCityId(1, function(lines) {
		console.log(lines);
	});
}

getByCityId();