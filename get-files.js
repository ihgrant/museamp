var fs = require('fs');
var find = require('findit');
var Promise = require('bluebird');
var mm = Promise.promisify(require('musicmetadata'));

var getFiles = function (dir) {
	var finder = find(dir, null);
	var files = [];
	var cover = '';

	return new Promise((resolve, reject) => {
		finder.on('file', (file, stat) => {
			if (isMusic(file)) {
				getFileInfo(file).then(file => {
					files.push(file);
				}).catch(err => console.error(err));
			} else if (isCoverImage(file)) {
				cover = file;
			}
		});
		finder.on('end', () => resolve(files));
		finder.on('error', reject);
	});
};

var getFileInfo = function (file) {
	var stream = fs.createReadStream(file);
	return mm(stream);
};

var isMusic = function (filename) {
	var a = filename.split('.'),
	ext = a[a.length-1],
	valid = [
		'mp3',
		'wav'
	];
	return (valid.indexOf(ext) !== -1);
};

var isCoverImage = function (filename) {
	var a = filename.split('.'),
	ext = a[a.length-1],
	valid = [
		'jpg',
		'png'
	];
	return (valid.indexOf(ext) !== -1);
};

module.exports = getFiles;
