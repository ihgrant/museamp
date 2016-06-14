var should = require('should');
var songLibrary = require('../song-library');

describe('song library', function () {

	it('initializes without error', function (done) {
		return songLibrary.initialize();
	});

	it('adds song records without error', function (done) {
		songLibrary.addSong({
			title: 'test title',
			album: 'test album',
			artist: 'test artist',
			filepath: './test.mp3'
		}).then(result => {
			done();
		}).catch(done);
	});

	it('gets all song records with corresponding filepaths', function (done) {
		songLibrary.getAllSongs().then(results => {
			console.log(results);
			done();
		}).catch(done);
	});
});
