'use strict';

var _ = require('lodash');
var desireds = require('./desireds');

var gruntConfig = {
  env: {
    // dynamically filled
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc',
    },
    gruntfile: {
        src: 'Gruntfile.js'
    },
    test: {
        src: ['specs/example_spec.js']
    },
  },
  concurrent: {
    'test-sauce': [], // dynamically filled
  },
  watch: {
    gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
    },
    test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test']
    },
  },
  protractor: {
    sauce: {
      options: {
        keepAlive: true,
        configFile: "protractor.conf.js"
      },
    },
  },
};

_.forIn(desireds,function(desired, key) {
  gruntConfig.env[key] = { 
      DESIRED: JSON.stringify(desired)
  };
  gruntConfig.concurrent['test-sauce'].push('test:sauce:' + key);
});

module.exports = function(grunt) {

  grunt.initConfig(gruntConfig);

  
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['test:sauce:' + _(desireds).keys().first()]);

  _.forIn(desireds,function(desired, key) {
    grunt.registerTask('test:sauce:' + key, ['env:' + key, 'protractor:sauce']);
  });
  grunt.registerTask('test:sauce:parallel', ['concurrent:test-sauce']);
};