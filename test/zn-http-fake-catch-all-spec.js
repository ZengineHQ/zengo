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

});
