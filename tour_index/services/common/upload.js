/**
 * 文件上传
 */

var utils = require('../../lib/utils');
var fs = require('fs');

exports.post = function(req, res) {
	var module = req.params.module;
	var upfile = req.files.file;
	
    var path = upfile.path;
    var name = upfile.name;
    
    var index = name.lastIndexOf('.');
    var suffix = name.substring(index);
    var newName = new Date().getTime() + utils.randomString(4) + suffix;
    
    var targetPath = './uploads/' + module + '/' + newName;
    fs.rename(path, targetPath, function(err) {
		if (err) {
			console.error(err);
			res.json({ error: '文件保存失败' });
		} else {
			res.json({ success: '文件保存成功', url: '/uploads/' + module + '/' + newName });
		}
    });
};