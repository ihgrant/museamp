var should = require('should');
var getFiles = require('../../get-files');

describe('getFiles', function () {
	var TEST_DIR = '../Music/Mouth Sounds/';

	it('should return results', function (done) {
		getFiles(TEST_DIR).then(files => {
			console.log(files);
			files.should.matchEach(value => {
				value.should.have.property('title');
			});
			done();
		}).catch(done);
	});
});
