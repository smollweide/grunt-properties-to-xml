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
			xmlNodeAttributeName: 'key'
		});

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

		function getStrXmlNode (key, value) {

			return '<' + options.xmlNodeName + ' ' + options.xmlNodeAttributeName + '="' + key + '"' + '>' +
				value +
				'</' + options.xmlNodeName + '>';
		}

		function translateToXml (data) {

			var out = [];

			data = translateToObject(data);

			var key;

			for (key in data) {
				if (data.hasOwnProperty(key)) {
					var value = data[key];

					out.push(getStrXmlNode(key,value));
				}
			}

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
				grunt.file.write(data.dest, translateToXml(src));
				grunt.log.writeln('File "' + data.dest + '" created.');
			});
		});
	});

};
