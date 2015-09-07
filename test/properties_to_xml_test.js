'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.properties_to_xml = {
	setUp: function (done) {
		// setup here if necessary
		done();
	},
	base: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/base.xml');
		var expected = grunt.file.read('test/expected/base.xml');
		test.equal(actual, expected);

		test.done();
	},
	baseGroups: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/baseGroups.xml');
		var expected = grunt.file.read('test/expected/baseGroups.xml');
		test.equal(actual, expected);

		test.done();
	},
	baseGroups2: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/baseGroups2.xml');
		var expected = grunt.file.read('test/expected/baseGroups2.xml');
		test.equal(actual, expected);

		test.done();
	},
	basePrefix: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/basePrefix.xml');
		var expected = grunt.file.read('test/expected/basePrefix.xml');
		test.equal(actual, expected);

		test.done();
	},
	basePrefixGroups2: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/basePrefixGroups2.xml');
		var expected = grunt.file.read('test/expected/basePrefixGroups2.xml');
		test.equal(actual, expected);

		test.done();
	},
	basePrefixGroupsAndKeys: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/basePrefixGroupsAndKeys.xml');
		var expected = grunt.file.read('test/expected/basePrefixGroupsAndKeys.xml');
		test.equal(actual, expected);

		test.done();
	},
	keysAsAttributes: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/keysAsAttributes.xml');
		var expected = grunt.file.read('test/expected/keysAsAttributes.xml');
		test.equal(actual, expected);

		test.done();
	},
	keysAsAttributes2: function (test) {
		test.expect(1);

		var actual = grunt.file.read('tmp/keysAsAttributes2.xml');
		var expected = grunt.file.read('test/expected/keysAsAttributes2.xml');
		test.equal(actual, expected);

		test.done();
	}
};
