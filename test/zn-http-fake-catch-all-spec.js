'use strict';

describe('ZnHttpFake (catch all)', function() {

	var zengo = require('../index.js');
	var Promise = require('bluebird');

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

			var check = function(results) {
				expect(results.getBody().data).to.be.eql([{id:1, name:'Workspace1'}, {id:2, name:'Workspace2'}]);
			};

			return znHttpFake.get('/workspaces').then(check);

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

			var check = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 2});
			};

			return znHttpFake.get('/workspaces/count').then(check);

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

			var check = function(results) {
				expect(results.getBody().data).to.be.eql({id: 201, name: 'Workspace2' });
			};

			return znHttpFake.get('/workspaces/201').then(check);

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

			var check = function(results) {
				expect(results.getBody().data).to.be.eql([{id:3, name:'Role3'},{id:4, name:'Role4'}]);
			};

			return znHttpFake.get('/workspaces/201/roles').then(check);

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

			var check = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 2});
			};

			return znHttpFake.get('/workspaces/201/roles/count').then(check);

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

			var check = function(results) {
				expect(results.getBody().data).to.be.eql({id: 4, name: 'Role4'});
			};

			return znHttpFake.get('/workspaces/201/roles/4').then(check);

		});


	});

	describe('post', function() {

		it('should save data for /:resource when resource does not exists', function() {

			var datum = {};

			var data = {
				name: 'Workspace1'
			};

			var znHttpFake = zengo.znHttpFake(datum);

			var save = function() {
				return znHttpFake.post('/workspaces', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:1, name:'Workspace1'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 1});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var save = function() {
				return znHttpFake.post('/workspaces', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:5, name:'Workspace5'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 4});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var save = function() {
				return znHttpFake.post('/workspaces/101/roles', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:1, name:'Role1'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/101/roles/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 1});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var save = function() {
				return znHttpFake.post('/workspaces/101/roles', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:202, name:'Role2'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/101/roles/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 2});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var save = function() {
				return znHttpFake.put('/workspaces/2', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:2, name:'Workspace2 updated'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 3});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var save = function() {
				return znHttpFake.put('/workspaces/4/roles/202', data);
			};

			var checkSave = function(results) {
				expect(results.getBody().data).to.be.eql({id:202, name:'Role2 updated'});
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/4/roles/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 2});
			};

			return save().then(checkSave).then(getCount).then(checkCount);

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

			var del = function() {
				return znHttpFake.del('/workspaces/2');
			};

			var checkDelete = function(results) {
				expect(results.getBody().data).to.be.undefined;
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 2});
			};

			return del().then(checkDelete).then(getCount).then(checkCount);

		});

		it('should save delete for /:resource/:resourceId/:subResource/:subResourceId', function() {

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

			var del = function() {
				return znHttpFake.del('/workspaces/4/roles/202');
			};

			var checkDelete = function(results) {
				expect(results.getBody().data).to.be.undefined;
			};

			var getCount = function() {
				return znHttpFake.get('/workspaces/4/roles/count');
			};

			var checkCount = function(results) {
				expect(results.getBody()).to.be.eql({status: 200, code: 2000, totalCount: 1});
			};

			return del().then(checkDelete).then(getCount).then(checkCount);

		});

	});

});
