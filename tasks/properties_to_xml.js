/*
 * grunt-properties-to-xml
 * 
 *
 * Copyright (c) 2015 Simon Mollweide
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('properties_to_xml', 'Convert java .properties files to xml files.', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			head: '',
			xmlNodeName: 'label',
			xmlNodeAttributeName: 'key',
			groupByKey: false,
			groupByKeyXmlNodeName: 'group',
			groupByKeyXmlNodeAttributeName: 'name',
			groupByKeyPattern: /(^[a-zA-Z0-9-_]*)(\.)(.*)/,
			groupByKeyNumber: 1,
			groupByKeyOut: -1,
			keyPrefix: '',
			valuePrefix: '',
			groupPrefix: '',
			keysAsAttributes: false,
			additionalGroupAttributes: []
		});

		function _forIn (obj, callback) {

			var key;

			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					var value = obj[key];
					callback.call({}, key, value);
				}
			}
		}

		function _for (arr, callback) {

			var i, len = arr.length;

			for (i = 0; i < len; i +=1) {
				callback.call({}, arr[i], i);
			}
		}

		function translateToObject (data) {

			var fileSpl = data.split(/\n/),
				out = {};

			fileSpl.forEach(function (item) {
				var itemSpl, value;

				if (item.search(/^#/) >= 0) {
					return true;
				}

				itemSpl = item.split('=');

				if (itemSpl.length < 2) {
					return true;
				}

				value = itemSpl.slice(1, itemSpl.length);
				value = value.join('=');

				out[itemSpl[0].trim()] = value.trim();

				return true;
			});

			return out;

		}

		function translateToGroupedObject (data) {

			var fileSpl = data.split(/\n/),
				out = {};

			fileSpl.forEach(function (item) {
				var itemSpl, value, key, reg, group;

				if (item.search(/^#/) >= 0) {
					return true;
				}

				itemSpl = item.split('=');

				if (itemSpl.length < 2) {
					return true;
				}

				value = itemSpl.slice(1, itemSpl.length);
				value = value.join('=');
				value = value.trim();
				key = itemSpl[0].trim();

				reg = options.groupByKeyPattern.exec(key);

				group = reg[options.groupByKeyNumber];

				if (typeof(out[group]) !== 'object') {
					out[group] = {};
				}

				if (options.groupByKeyOut >= 0) {
					key = reg[options.groupByKeyOut].trim();
				}

				out[group][key] = value;

				return true;
			});

			return out;

		}

		function getStrXmlNode (key, value) {
			return '<' + options.xmlNodeName + ' ' + options.xmlNodeAttributeName + '="' + options.keyPrefix + key + '"' + '>' +
				options.valuePrefix + escapeValue(value) +
				'</' + options.xmlNodeName + '>';
		}

		function getStrXmlAttribute (key, value) {
			return options.keyPrefix + key + '="' + options.valuePrefix + escapeValue(value) + '"';
		}

		function escapeValue (val) {
			return val
				.replace(/&/g, '&amp;')
				.replace(/"/g, '&quot;')
				.replace(/\[/g, '\\[')
				.replace(/]/g, '\\]')
			;
		}

		function translateToGroupedXml (data) {

			var out = [];

			if (options.head !== '') {
				out.push(options.head);
			}

			if (options.keysAsAttributes) {

				_forIn(translateToGroupedObject(data), function (groupKey, groupValue) {

					var groupName = options.groupPrefix + groupKey;

					out.push(
						'<' + groupName
					);

					if (options.additionalGroupAttributes.length > 0) {
						_for (options.additionalGroupAttributes, function (groupAttribute) {
							out.push('\t' + groupAttribute.replace(/\{=groupName\}/g, groupName));
						});
					}

					_forIn(groupValue, function (key, value) {
						out.push('\t' + getStrXmlAttribute(key,value));
					});
					out.push(
						'/>'
					);
				});

				return out.join('\n');
			}

			_forIn(translateToGroupedObject(data), function (groupKey, groupValue) {
				out.push(
					'<' + options.groupByKeyXmlNodeName + ' ' +
					options.groupByKeyXmlNodeAttributeName + '="' + options.groupPrefix + groupKey + '"' +
					'>'
				);
				_forIn(groupValue, function (key, value) {
					out.push('\t' + getStrXmlNode(key,value));
				});
				out.push(
					'</' + options.groupByKeyXmlNodeName + '>'
				);
			});

			return out.join('\n');
		}

		function translateToXml (data) {

			var out = [];

			if (options.head !== '') {
				out.push(options.head);
			}

			if (options.keysAsAttributes) {

				out.push(
					'<' + options.xmlNodeName
				);

				if (options.additionalGroupAttributes.length > 0) {
					_for (options.additionalGroupAttributes, function (groupAttribute) {
						out.push('\t' + groupAttribute);
					});
				}

				_forIn(translateToObject(data), function (key, value) {
					out.push('\t' + getStrXmlAttribute(key,value));
				});

				out.push(
					'/>'
				);

				return out.join('\n');
			}

			_forIn(translateToObject(data), function (key, value) {
				out.push(getStrXmlNode(key,value));
			});

			return out.join('\n');
		}

		// Iterate over all specified file groups.
		this.files.forEach(function (data) {
			data.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function (filepath) {
				var src = grunt.file.read(filepath);
				if (options.groupByKey) {
					grunt.file.write(data.dest, translateToGroupedXml(src));
				} else {
					grunt.file.write(data.dest, translateToXml(src));
				}
				grunt.log.writeln('File "' + data.dest + '" created.');
			});
		});
	});

};
