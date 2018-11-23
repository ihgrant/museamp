var fs = require('fs');
var find = require('findit');
var Promise = require('bluebird');
var mm = Promise.promisify(require('musicmetadata'));

var getFiles = function(dir) {
    return new Promise((resolve, reject) => {
        var finder = find(dir, null);
        var files = [];
        var cover = '';

        finder.on('file', (file, stat) => {
            files.push({ file, stat });
        });

        finder.on('end', () => {
            const result = files.filter(el => isMusic(el.file));
            console.info('finished: ' + result.length + ' files found.');

            Promise.map(result, el => getFileInfo(el.file)).then(resolve);
        });

        finder.on('error', reject);
    });
};

var getFileInfo = function(file) {
    var stream = fs.createReadStream(file);

    return mm(stream).then(metadata =>
        Object.assign({}, metadata, { path: file })
    );
};

var isMusic = function(filename) {
    var a = filename.split('.');
    var ext = a[a.length - 1];
    var valid = ['mp3', 'wav'];

    return valid.indexOf(ext) !== -1;
};

var isCoverImage = function(filename) {
    var a = filename.split('.');
    var ext = a[a.length - 1];
    var valid = ['jpg', 'png'];

    return valid.indexOf(ext) !== -1;
};

module.exports = getFiles;
