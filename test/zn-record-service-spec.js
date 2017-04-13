'use strict';

describe('ZnRecordService', function() {

	var zengo = require('../index.js');

	var formDao;
	var recordDao;

	beforeEach(function() {
		var znHttpFake = zengo.znHttpFake();
		var data = zengo.data(znHttpFake);
		formDao = data.forForms();
		recordDao = data.forRecordsOf(7);
	});

	describe('query', function() {
		it('should query form records', function() {

			var saveRecords = function() {
				return recordDao.save({
					name: 'apples',
				}).then(function() {
					recordDao.save({
						name: 'bananas'
					});
				});
			};

			var query = function() {
				return recordDao.query();
			};

			var assert = function(response) {
				expect(response.totalCount).to.equal(2);
				expect(response.data[0].getName()).to.eql('apples');
				expect(response.data[1].getName()).to.eql('bananas');
			};

			return saveRecords().then(query).then(assert);
		});
	});
});
