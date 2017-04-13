'use strict';

var assign = require('lodash.assign');
var forEach = require('lodash.foreach');
var map = require('lodash.map');
var filter = require('lodash.filter');

var ZnForm = function(data) {
	assign(this, data);
	this.fields = this.fields || [];
};

ZnForm.prototype.getRequiredFields = function() {

	var filter = function(field) {
		return field.settings.validation.required;
	};

	return this.filterFields(filter);
};

ZnForm.prototype.getFieldsOfTypes = function(eligibleTypes) {

	var isEligible = function(field) {
		return eligibleTypes.indexOf(field.type) !== -1;
	};

	return this.filterFields(isEligible);
};

ZnForm.prototype.filterFields = function(filter) {
	var fields = [];

	if (this.fields) {
		fields = this.fields.filter(filter);
	}

	return fields;
};

ZnForm.prototype.getLinkedFormIds = function(linkType) {

	var targetLinkedForms = this.filterLinkedFormsByLinkType(linkType);

	return map(targetLinkedForms, function(linkedForm) {
		return linkedForm.form.id;
	});
};

ZnForm.prototype.filterLinkedFormsByLinkType = function(linkType) {

	if (!linkType) {
		return this.linkedForms;
	}

	return filter(this.linkedForms, function(linkedForm) {
		return linkedForm.type === linkType;
	});
};

module.exports = ZnForm;
