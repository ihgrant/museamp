var should = require('should');
var library = require('../library');

describe('song library', function () {

	it('initializes without error', function (done) {
		return library.initialize().then(result => {
			should.equal(result.length, 1);
			done();
		}).catch(done);
	});

	it('adds song records without error', function (done) {
		return library.addSong({
			title: 'test title',
			album: 'test album',
			artist: 'test artist',
			filepath: './test.mp3'
		}).then(result => {
			done();
		}).catch(done);
	});

	it('gets all song records with corresponding filepaths', function (done) {
		return library.getAllSongs().then(results => {
			console.log(results);
			done();
		}).catch(done);
	});
});
