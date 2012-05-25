/* global module: false */
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner:
        '/* <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      grunt: ['grunt.js'],
      lib: ['lib/**/*.js'],
      spec: ['spec/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<config:lint.lib>'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    watch: {
      files: ['<config:lint.grunt>', '<config:lint.lib>', '<config:lint.spec>'],
      tasks: 'lint'
    }
  });

  grunt.registerTask('default', 'lint concat min');
};
