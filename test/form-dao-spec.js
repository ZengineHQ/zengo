'use strict';

describe('FormDao', function() {

	var util = require('./support/api-test-util.js');

	var FormDao = require('../src/form-dao.js');

	var formDao;
	var znNock;

	beforeEach(function() {
		var api = util.createApi();
		formDao = FormDao(api);

		znNock = util.ZnNock();
	});

	describe('get', function () {

		it('should call api and return form object', function() {

			znNock.get('/forms/123').reply(200, {
				data: {
					id: 123
				}
			});

			return formDao.get(123).then(function(form) {
				expect(form.id).to.equal(123);
			});
		});
	});

	describe('query', function () {

		it('should query', function() {

			var expectedUrl = '/forms' +
				'?workspace.id=40' +
				'&attributes=id%2Cname' +
				'&related=fields%2Cfolders';

			znNock.get(expectedUrl).reply(200, {
				data: [
					{ id: 5 },
					{ id: 6 }
				]
			});

			var request = {
				workspace: {
					id: 40
				}
			};

			return formDao.query(request).then(function(response) {

				expect(response.data).to.exist;
				expect(response.data.length).to.equal(2);

				expect(response.data[0].id).to.equal(5);
				expect(response.data[1].id).to.equal(6);
			});
		});
	});

	describe('save', function() {
		it('should create form and return form object', function() {

			znNock.post('/forms', {
				field123: 'apples'
			})
				.reply(200, {
					data: {
						id: 1,
						saved: true
					}
				});

			var form = {
				field123: 'apples'
			};

			return formDao.save(form)
				.then(function(response) {
					expect(response).to.eql({
						id: 1,
						saved: true
					});
				});
		});
	});
});
