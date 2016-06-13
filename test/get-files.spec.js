var should = require('should');
var getFiles = require('../get-files');

describe('getFiles', function () {
	var TEST_DIR = '../Music';

	it('should return results', function (done) {
		this.timeout(10000);
		return getFiles(TEST_DIR).then(files => {
			files.length.should.be.above(0);
			done();
		}).catch(done);
	});
});
