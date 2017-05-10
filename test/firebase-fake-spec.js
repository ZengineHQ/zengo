'use strict';

describe('Firebase fake', function() {

	var Firebase = require('../').firebaseFake;

	var fb;

	beforeEach(function() {
		fb = new Firebase();
	});

	it('should initialize with data pre loaded', function() {

		var data = {
			settings: {
				forms: {
					id: 1
				}
			}
		};

		var firebase = new Firebase(data);

		var ref = firebase.child('settings/forms');

		ref.once('value', function(snapshot) {
			expect(snapshot.val()).to.be.eql({id: 1});
		});

	});

	it('should be able to get a firebase reference and its methods', function() {

		var ref = fb.child('test');

		expect(ref.data).to.deep.equal({});

		expect(ref.path).to.equal('test');

		expect(ref).to.respondTo('child');
		expect(ref).to.respondTo('set');
		expect(ref).to.respondTo('once');

	});

	it('should be able to set data', function() {

		var ref = fb.child('test');

		var data = { test: 1 };

		ref.set(data, function() {

			var expected = { test: data };

			expect(ref.data).to.deep.equal(expected);

		});

	});

	it('should be able to get data with `once`', function() {

		var ref = fb.child('test');

		var data = { test: 1 };

		ref.set(data);

		ref.once('event', function(snapshot) {
			expect(snapshot.val()).to.deep.equal(data);
		});

	});

});
