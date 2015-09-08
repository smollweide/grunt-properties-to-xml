# grunt-properties-to-xml

> Convert java .properties files to xml files.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-properties-to-xml --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-properties-to-xml');
```

## The "properties_to_xml" task

### Overview
In your project's Gruntfile, add a section named `properties_to_xml` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  properties_to_xml: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.head
Type: `String`
Default value: `''`

A string value that is used to define the xml head.

#### options.xmlNodeName
Type: `String`
Default value: `label`

A string value that is used to define the xml node name.

#### options.xmlNodeAttributeName
Type: `String`
Default value: `key`

A string value that is used to define the xml node attribute name.

#### options.groupByKey
Type: `Boolean`
Default value: `false`

A boolean that is used to enable/disable grouping.
Groups are defined in combination with:
- `options.groupByKeyPattern` 
- `options.groupByKeyNumber`

#### options.groupByKeyXmlNodeName
Type: `String`
Default value: `group`

A string value that is used to define the group xml node attribute name.

#### options.groupByKeyXmlNodeAttributeName
Type: `String`
Default value: `key`

A string value that is used to define the group attribute name.

#### options.groupByKeyPattern
Type: `RegExp`
Default value: `/(^[a-zA-Z0-9-_]*)(\.)(.*)/`

A RegExp value that is used to identify the group in the key.

#### options.groupByKeyNumber
Type: `Number`
Default value: `1`

A number that is used to define the group position in the `options.groupByKeyPattern`.

#### options.groupByKeyOut
Type: `Number`
Default value: `-1`

A number that is used to define the exec `options.groupByKeyPattern` position for xml node name.
Default `-1` use the `options.groupByKeyXmlNodeName`

#### options.keyPrefix
Type: `String`
Default value: `''`

A string value that is used to define a key prefix.

#### options.groupPrefix
Type: `String`
Default value: `''`

A string value that is used to define a group prefix.

#### options.keysAsAttributes
Type: `Boolean`
Default value: `false`

A boolean that is used to enable/disable keys as attributes.

true:
```
<label 
  key="value"
  key2="value2"
  />
```

false:
```
<label key="value" />
<label key2="value2" />
```

#### options.additionalGroupAttributes
Type: `Array`
Default value: `[]`

Adds group attributes.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  properties_to_xml: {
    options: {},
    files: {
      'tmp/base.xml': ['test/fixtures/base.properties']
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  properties_to_xml: {
    options: {
      xmlNodeName: 'label',
      xmlNodeAttributeName: 'key',
      groupByKey: false,
      groupByKeyXmlNodeName: 'group',
      groupByKeyXmlNodeAttributeName: 'name',
      groupByKeyPattern: /(^[a-zA-Z0-9-_]*)(\.)(.*)/,
      groupByKeyNumber: 1,
      groupByKeyOut: -1,
      keyPrefix: '',
      groupPrefix: '',
      keysAsAttributes: false,
      additionalGroupAttributes: []
    },
    files: {
      'tmp/keysAsAttributes.xml': ['test/fixtures/keysAsAttributes.properties']
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1.0 basic functionality
- 0.2.0 keys as attributes
