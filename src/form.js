'use strict';

var attribute = require('./attribute');

var Form = {};

Form.getLinkedForm = function(form, formId) {

	if (!form || !form.linkedForms) {
		return false;
	}

	formId = parseInt(formId);

	var result = form.linkedForms.find(function(linkedForm) {
		return parseInt(linkedForm.form.id) === formId;
	});

	return result ? result : false;
};

/**
 * Attribute of Linked Field to Form Id
 *
 */
Form.getLinkedAttributeTo = function(form, formId) {

	var link = Form.getLinkedForm(form, formId);

	if (!link) {
		return false;
	}

	if (link.type === 'hasOne') {
		return 'form' + formId;
	} else if (link.type === 'belongsTo') {
		return attribute.forFieldId(link.keyField.id);
	}

	return false;

};

module.exports = Form;
