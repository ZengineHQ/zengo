'use strict';

module.exports = {
	respond: function(data) {
		return {
			data: data,
			totalCount: data.length || 0,
			offset: 0,
			limit: 500
		};
	},
};
