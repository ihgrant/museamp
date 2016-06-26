var should = require('should');
var getFiles = require('../../src/main-process/get-files');

describe('getFiles', function () {
	var TEST_DIR = '../Music/Mouth Sounds/';

	it('should return results', function (done) {
		getFiles(TEST_DIR).then(files => {
			files.length.should.be.above(0);
			files.should.matchEach(value => {
				value.should.have.property('title');
				value.should.have.property('path');
			});
			done();
		}).catch(done);
	});
});
