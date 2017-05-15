'use strict';

describe('ZnHttpFake (catch all)', function() {

	var zengo = require('../index.js');
	var Api = require('../src/api.js');

	describe('get', function() {

		it('should return data for /:resource', function() {

			var datum = {
				workspaces: [
					{
						id: 1,
						name: 'Workspace1'
					},
					{
						id: 2,
						name: 'Workspace2'
					}
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.eql([{id:1, name:'Workspace1'}, {id:2, name:'Workspace2'}]);
			};

			return api.get('/workspaces').then(check);

		});

		it('should return count for /:resource', function() {

			var datum = {
				workspaces: [
					{
						id: 1,
						name: 'Workspace1'
					},
					{
						id: 2,
						name: 'Workspace2'
					}
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.equal(2);
			};

			return api.count('/workspaces').then(check);

		});

		it('should return data for /:resource/:resourceId', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1'
					},
					{
						id: 201,
						name: 'Workspace2'
					}
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.eql({id: 201, name: 'Workspace2' });
			};

			return api.get('/workspaces/201').then(check);

		});

		it('should return data for /:resource/:resourceId/:subResource', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1',
						roles: [
							{
								id: 1,
								name: 'Role1'
							},
							{
								id: 2,
								name: 'Role2'
							}
						]
					},
					{
						id: 201,
						name: 'Workspace2',
						roles: [
							{
								id: 3,
								name: 'Role3'
							},
							{
								id: 4,
								name: 'Role4'
							}
						]
					}

				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.eql([{id:3, name:'Role3'},{id:4, name:'Role4'}]);
			};

			return api.get('/workspaces/201/roles').then(check);

		});

		it('should return count for /:resource/:resourceId/:subResource', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1',
						roles: [
							{
								id: 1,
								name: 'Role1'
							}
						]
					},
					{
						id: 201,
						name: 'Workspace2',
						roles: [
							{
								id: 2,
								name: 'Role2'
							},
							{
								id: 3,
								name: 'Role3'
							},
							{
								id: 4,
								name: 'Role4'
							}
						]
					}

				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.equal(3);
			};

			return api.count('/workspaces/201/roles').then(check);

		});

		it('should return data for /:resource/:resourceId/:subResource/:subResourceId', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1',
						roles: [
							{
								id: 1,
								name: 'Role1'
							},
							{
								id: 2,
								name: 'Role2'
							}
						]
					},
					{
						id: 201,
						name: 'Workspace2',
						roles: [
							{
								id: 3,
								name: 'Role3'
							},
							{
								id: 4,
								name: 'Role4'
							}
						]
					}

				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results).to.be.eql({id: 4, name: 'Role4'});
			};

			return api.get('/workspaces/201/roles/4').then(check);

		});


	});

	describe('post', function() {

		it('should save data for /:resource when resource does not exists', function() {

			var datum = {};

			var data = {
				name: 'Workspace1'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:1, name:'Workspace1'});
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				expect(results).to.be.eql([{id:1, name:'Workspace1'}]);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for /:resource when resource exists', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' }
				]
			};

			var data = {
				name: 'Workspace5'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:5, name:'Workspace5'});
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for /:resource/:resourceId/:subResource when sub resource does not exists', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1'
					}
				]
			};

			var data = {
				name: 'Role1'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces/101/roles', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:1, name:'Role1'});
			};

			var getData = function() {
				return api.get('/workspaces/101/roles');
			};

			var checkData = function(results) {
				expect(results).to.be.eql([{id:1, name:'Role1'}]);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for /:resource/:resourceId/:subResource when sub resource exists', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1',
						roles: [
							{
								id: 201,
								name: 'Role1'
							}
						]
					}
				]
			};

			var data = {
				name: 'Role2'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces/101/roles', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:202, name:'Role2'});
			};

			var getData = function() {
				return api.get('/workspaces/101/roles');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 201, name: 'Role1' },
					{ id: 202, name: 'Role2' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

	});

	describe('put', function() {

		it('should save data for /:resource/:resourceId', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' }
				]
			};

			var data = {
				name: 'Workspace2 updated'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.put('/workspaces/2', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:2, name:'Workspace2 updated'});
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2 updated' },
					{ id: 4, name: 'Workspace4' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for /:resource/:resourceId/:subResource/:subResourceId', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{
						id: 4,
						name: 'Workspace4',
						roles: [
							{ id: 201, name: 'Role1' },
							{ id: 202, name: 'Role2' }
						]
					}
				]
			};

			var data = {
				name: 'Role2 updated'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.put('/workspaces/4/roles/202', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql({id:202, name:'Role2 updated'});
			};

			var getData = function() {
				return api.get('/workspaces/4/roles');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 201, name: 'Role1' },
					{ id: 202, name: 'Role2 updated' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

	});

	describe('del', function() {

		it('should delete data for /:resource/:resourceId', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var del = function() {
				return api.del('/workspaces/2');
			};

			var checkReponse = function(results) {
				expect(results).to.be.undefined;
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 1, name: 'Workspace1' },
					{ id: 4, name: 'Workspace4' }
				];
				expect(results).to.be.eql(expected);
			};

			return del().then(checkReponse).then(getData).then(checkData);

		});

		it('should delete for /:resource/:resourceId/:subResource/:subResourceId', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{
						id: 4,
						name: 'Workspace4',
						roles: [
							{ id: 201, name: 'Role1' },
							{ id: 202, name: 'Role2' }
						]
					}
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var del = function() {
				return api.del('/workspaces/4/roles/202');
			};

			var checkResponse = function(results) {
				expect(results).to.be.undefined;
			};

			var getData = function() {
				return api.get('/workspaces/4/roles');
			};

			var checkData = function(results) {
				expect(results).to.be.eql([{ id: 201, name: 'Role1' }]);
			};

			return del().then(checkResponse).then(getData).then(checkData);

		});

	});

	describe('batch save', function() {

		it('should save data for new resource', function() {

			var datum = {};

			var data = [
				{ name: 'Workspace1' },
				{ name: 'Workspace2' }
			];

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql([1, 2]);
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				expect(results).to.be.eql([{id:1, name:'Workspace1'}, {id:2, name:'Workspace2'}]);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for existing resource', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' }
				]
			};

			var data = [
				{ name: 'Workspace5' },
				{ name: 'Workspace6' }
			];

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql([5,6]);
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' },
					{ id: 6, name: 'Workspace6' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for new sub resource', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1'
					}
				]
			};

			var data = [
				{ name: 'Role1' },
				{ name: 'Role2' }
			];

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces/101/roles', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql([1,2]);
			};

			var getData = function() {
				return api.get('/workspaces/101/roles');
			};

			var checkData = function(results) {
				expect(results).to.be.eql([{id:1, name:'Role1'}, {id:2, name:'Role2'}]);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should save data for existing sub resource', function() {

			var datum = {
				workspaces: [
					{
						id: 101,
						name: 'Workspace1',
						roles: [
							{
								id: 201,
								name: 'Role1'
							}
						]
					}
				]
			};

			var data = [
				{ name: 'Role2' },
				{ name: 'Role3' }
			];

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces/101/roles', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql([202,203]);
			};

			var getData = function() {
				return api.get('/workspaces/101/roles');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 201, name: 'Role1' },
					{ id: 202, name: 'Role2' },
					{ id: 203, name: 'Role3' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});

		it('should update existing and save new', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 4, name: 'Workspace4' }
				]
			};

			var data = [
				{ id: 2, name: 'Workspace2 updated'},
				{ id: 4, name: 'Workspace4 updated'},
				{ name: 'Workspace5' },
				{ name: 'Workspace6' }
			];

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var save = function() {
				return api.post('/workspaces', data);
			};

			var checkResponse = function(results) {
				expect(results).to.be.eql([2,4,5,6]);
			};

			var getData = function() {
				return api.get('/workspaces');
			};

			var checkData = function(results) {
				var expected = [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2 updated' },
					{ id: 4, name: 'Workspace4 updated' },
					{ id: 5, name: 'Workspace5' },
					{ id: 6, name: 'Workspace6' }
				];
				expect(results).to.be.eql(expected);
			};

			return save().then(checkResponse).then(getData).then(checkData);

		});
	});

	describe('filtering with `filter` query param', function() {

		it('should return results for prefix `` (equal)', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: '', attribute: 'id', value: 3 } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `not`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: {
					and: [
						{ prefix: 'not', attribute: 'id', value: 1 },
						{ prefix: 'not', attribute: 'id', value: 2 },
						{ prefix: 'not', attribute: 'id', value: 4 },
						{ prefix: 'not', attribute: 'id', value: 5 }
					]
				}
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `contains`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'space3' } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `not-contains`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: {
					and: [
						{ prefix: 'not-contains', attribute: 'name', value: 'space1' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space3' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space4' },
						{ prefix: 'not-contains', attribute: 'name', value: 'space5' }
					]
				}
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 2, name: 'Workspace2' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `starts-with`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'The first workspace1' },
					{ id: 2, name: 'The second workspace2' },
					{ id: 3, name: 'The third workspace3' },
					{ id: 4, name: 'The fourth workspace4' },
					{ id: 5, name: 'The fifth workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'The second' } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 2, name: 'The second workspace2' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `ends-with`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: 'contains', attribute: 'name', value: 'space3' } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `min`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: 'min', attribute: 'id', value: 4 } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([ { id: 4, name: 'Workspace4' }, { id: 5, name: 'Workspace5' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `max`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: { and: [ { prefix: 'max', attribute: 'id', value: 2 } ] }
			};

			var check = function(results) {
				expect(results.data).to.eql([{ id: 1, name: 'Workspace1' }, { id: 2, name: 'Workspace2' }]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for `or` filter', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: {
					or: [
						{ prefix: '', attribute: 'id', value: 3 },
						{ prefix: '', attribute: 'id', value: 5 }
					]
				}
			};

			var check = function(results) {
				expect(results.data).to.eql([
					{ id: 3, name: 'Workspace3' },
					{ id: 5, name: 'Workspace5' },
				]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return all results for empty `and` filter', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: {
					and: []
				}
			};

			var check = function(results) {
				expect(results.data).to.eql([
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
				]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return all results for empty `or` filter', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = {
				filter: {
					or: []
				}
			};

			var check = function(results) {
				expect(results.data).to.eql([
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
				]);
			};

			return api.query('/workspaces', params).then(check);

		});

	});

	describe('filtering with query params', function() {

		it('should return results for prefix `` (equal)', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { id: 3 };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `not`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'not-id': '1|2|4|5' };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `contains`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'contains-name': 'space3' };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `not-contains`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'not-contains-name': 'space1|space3|space4|space5' };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 2, name: 'Workspace2' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `starts-with`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'The first workspace1' },
					{ id: 2, name: 'The second workspace2' },
					{ id: 3, name: 'The third workspace3' },
					{ id: 4, name: 'The fourth workspace4' },
					{ id: 5, name: 'The fifth workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'contains-name': 'The second' };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 2, name: 'The second workspace2' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `ends-with`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'ends-with-name': 'space3' };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 3, name: 'Workspace3' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `min`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'min-id': 4 };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 4, name: 'Workspace4' }, { id: 5, name: 'Workspace5' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

		it('should return results for prefix `max`', function() {

			var datum = {
				workspaces: [
					{ id: 1, name: 'Workspace1' },
					{ id: 2, name: 'Workspace2' },
					{ id: 3, name: 'Workspace3' },
					{ id: 4, name: 'Workspace4' },
					{ id: 5, name: 'Workspace5' }
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var params = { 'max-id': 2 };

			var check = function(results) {
				expect(results.data).to.eql([ { id: 1, name: 'Workspace1' }, { id: 2, name: 'Workspace2' } ]);
			};

			return api.query('/workspaces', params).then(check);

		});

	});

	describe('sorting and paging', function() {

		it('sorts by id asc by default', function() {

			var datum = {
				workspaces: [
					{
						id: 100,
						name: 'Workspace100'
					},
					{
						id: 1,
						name: 'Workspace1'
					},
					{
						id: 7,
						name: 'Workspace7'
					}
				]
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var api = Api(znHttpFake);

			var check = function(results) {
				expect(results[0]).to.be.eql({id: 1, name: 'Workspace1'});
				expect(results[1]).to.be.eql({id: 7, name: 'Workspace7'});
				expect(results[2]).to.be.eql({id: 100, name: 'Workspace100'});
			};

			return api.get('/workspaces').then(check);

		});

	});

});
