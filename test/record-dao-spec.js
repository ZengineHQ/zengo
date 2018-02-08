'use strict';

describe('RecordDao', function() {

	var zengo = require('../index.js');

	var formDao;
	var recordDao;

	beforeEach(function() {
		var znHttpFake = zengo.fakes.znHttp();
		var data = zengo.data(znHttpFake);
		formDao = data.forForms();
		recordDao = data.forRecordsOf(7);
	});

	describe('query', function() {

		it('should query form records', function() {

			var saveForm = function() {
				var form = {
					id: 7,
					name: 'Fruits',
				};
				return formDao.save(form);
			};

			var saveRecords = function() {
				return recordDao.save({
					name: 'apples',
				}).then(function() {
					recordDao.save({
						name: 'bananas'
					});
				});
			};

			var deleteRecord = function(id) {
				return recordDao.delete({id: id})
			}

			var query = function() {
				return recordDao.query();
			};

			var assert = function(response) {
				expect(response.totalCount).to.equal(2);
				expect(response.data[0].record.name).to.eql('apples');
				expect(response.data[1].record.name).to.eql('bananas');
				expect(response.data[0].form.name).to.eql('Fruits');
				expect(response.data[1].form.name).to.eql('Fruits');
				return response.data[0].record.id;
			};

			var assertDeleted = function(response) {
				expect(response.totalCount).to.equal(1);
				expect(response.data[0].record.name).to.eql('bananas');
				expect(response.data[0].form.name).to.eql('Fruits');
			};

			return saveForm()
				.then(saveRecords)
				.then(query)
				.then(assert)
				.then(deleteRecord)
				.then(query)
				.then(assertDeleted);
		});

	});

});
