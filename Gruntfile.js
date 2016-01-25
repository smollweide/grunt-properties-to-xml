/*
 * grunt-properties-to-xml
 * 
 *
 * Copyright (c) 2015 Simon Mollweide
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		properties_to_xml: {
			base: {
				options: {},
				files: {
					'tmp/base.xml': ['test/fixtures/base.properties']
				}
			},
			baseGroups: {
				options: {
					groupByKey: true
				},
				files: {
					'tmp/baseGroups.xml': ['test/fixtures/baseGroups.properties']
				}
			},
			baseGroups2: {
				options: {
					groupByKey: true,
					groupByKeyOut: 3
				},
				files: {
					'tmp/baseGroups2.xml': ['test/fixtures/baseGroups2.properties']
				}
			},
			basePrefix: {
				options: {
					keyPrefix: 'react.'
				},
				files: {
					'tmp/basePrefix.xml': ['test/fixtures/basePrefix.properties']
				}
			},
			basePrefixGroups2: {
				options: {
					groupByKey: true,
					groupByKeyOut: 3,
					keyPrefix: 'react.'
				},
				files: {
					'tmp/basePrefixGroups2.xml': ['test/fixtures/basePrefixGroups2.properties']
				}
			},
			basePrefixGroupsAndKeys: {
				options: {
					groupByKey: true,
					groupByKeyOut: 3,
					keyPrefix: 'react.',
					groupPrefix: 'reactGroup.'
				},
				files: {
					'tmp/basePrefixGroupsAndKeys.xml': ['test/fixtures/basePrefixGroupsAndKeys.properties']
				}
			},
			keysAsAttributes: {
				options: {
					groupByKey: true,
					groupByKeyOut: 3,
					keysAsAttributes: true
				},
				files: {
					'tmp/keysAsAttributes.xml': ['test/fixtures/keysAsAttributes.properties']
				}
			},
			keysAsAttributes2: {
				options: {
					groupByKey: true,
					groupByKeyOut: 3,
					keysAsAttributes: true,
					additionalGroupAttributes: [
						'jcr:title="{=groupName}"',
						'jcr:primaryType="nt:unstructured"'
					]
				},
				files: {
					'tmp/keysAsAttributes2.xml': ['test/fixtures/keysAsAttributes.properties']
				}
			},
			keysAsAttributes3: {
				options: {
					head: '<?xml version="1.0" encoding="UTF-8"?>',
					keysAsAttributes: true,
					xmlNodeName: 'jcr:root',
					additionalGroupAttributes: [
						'xmlns:sling="http://sling.apache.org/jcr/sling/1.0"',
						'xmlns:jcr="http://www.jcp.org/jcr/1.0"',
						'jcr:title="React"',
						'jcr:primaryType="sling:Folder"'
					]
				},
				files: {
					'tmp/keysAsAttributes3.xml': ['test/fixtures/keysAsAttributes.properties']
				}
			},
			keysAsAttributes4: {
				options: {
					keyPrefix: 'React.',
					valuePrefix: '{String}',
					head: '<?xml version="1.0" encoding="UTF-8"?>',
					keysAsAttributes: true,
					xmlNodeName: 'jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"',
					additionalGroupAttributes: [
						'jcr:title="React"',
						'jcr:primaryType="nt:unstructured"'
					]
				},
				files: {
					'tmp/keysAsAttributes4.xml': ['test/fixtures/keysAsAttributes4.properties']
				}
			},
			specialSigns1: {
				options: {
					keyPrefix: 'React.',
					valuePrefix: '{String}',
					head: '<?xml version="1.0" encoding="UTF-8"?>',
					keysAsAttributes: true,
					xmlNodeName: 'jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"',
					additionalGroupAttributes: [
						'jcr:title="React"',
						'jcr:primaryType="nt:unstructured"'
					]
				},
				files: {
					'tmp/specialSigns1.xml': ['test/fixtures/specialSigns1.properties']
				}
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'properties_to_xml', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
