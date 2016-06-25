var should = require('should');
var songLibrary = require('../../src/main-process/song-library');

describe('song library', function () {

	it('can connect to the database', function (done) {
		return songLibrary.authenticate().then(result => {
			done();
		}).catch(done);
	});

	it('initializes without error', function (done) {
		return songLibrary.initialize({test: true}).then(result => {
			done();
		}).catch(done);
	});

	it('adds song records without error', function (done) {
		songLibrary.addSong({
			title: 'test title',
			album: 'test album',
			artist: 'test artist',
			path: './test.mp3'
		}).then(result => {
			done();
		}).catch(done);
	});

	it('gets all song records with corresponding filepaths', function (done) {
		songLibrary.getAllSongs().then(results => {
			console.log(results.map(song => song.title));
			done();
		}).catch(done);
	});

	after(function (done) {
		songLibrary.deleteAllSongs().then(() => {
			done()
		});
	});
});
