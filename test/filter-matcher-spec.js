'use strict';

describe('Filter matcher', function() {

	var matches = require('../src/filter-matcher.js')().recordMatchesFilter;

	it('should match dotted values', function() {
		var filter = {
			and: [
				{ prefix: '', attribute: 'folder.id', value: 3 }
			]
		};
		var record1 = {
			folder: {
				id: 1,
				name: 'Vegetables',
			}
		};
		var record2 = {
			folder: {
				id: 3,
				name: 'Fruits',
			}
		};
		expect(matches(record1, filter)).to.be.false;
		expect(matches(record2, filter)).to.be.true;
	});

});
