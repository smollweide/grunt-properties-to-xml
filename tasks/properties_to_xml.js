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
			xmlNodeName: 'label',
			xmlNodeAttributeName: 'key',
			groupByKey: false,
			groupByKeyXmlNodeName: 'group',
			groupByKeyXmlNodeAttributeName: 'name',
			groupByKeyPattern: /(^[a-zA-Z0-9-_]*)(\..*)/,
			groupByKeyNumber: 1
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

				out[group][key] = value.trim();

				return true;
			});

			return out;

		}

		function getStrXmlNode (key, value) {

			return '<' + options.xmlNodeName + ' ' + options.xmlNodeAttributeName + '="' + key + '"' + '>' +
				value +
				'</' + options.xmlNodeName + '>';
		}

		function translateToGroupedXml (data) {

			var out = [];

			_forIn(translateToGroupedObject(data), function (groupKey, groupValue) {
				out.push(
					'<' + options.groupByKeyXmlNodeName + ' ' +
					options.groupByKeyXmlNodeAttributeName + '="' + groupKey + '"' +
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
