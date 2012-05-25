/*global module: false*/
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
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
    }
  });

  grunt.registerTask('default', 'lint concat min');
};

/*global module:false*/
// module.exports = function(grunt) {

//   // Project configuration.
//   grunt.initConfig({
//     pkg: '<json:package.json>',
//     meta: {
//       banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
//         '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
//         '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
//         '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
//         ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
//     },
//     concat: {
//       dist: {
//         src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
//         dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
//       }
//     },
//     min: {
//       dist: {
//         src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
//         dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
//       }
//     },
//     lint: {
//       files: ['grunt.js', 'lib/**/*.js', 'spec/**/*.js']
//     },
//     watch: {
//       files: '<config:lint.files>',
//       tasks: 'lint qunit'
//     },
//     jshint: {
//       options: {
//         curly: true,
//         eqeqeq: true,
//         immed: true,
//         latedef: true,
//         newcap: true,
//         noarg: true,
//         sub: true,
//         undef: true,
//         boss: true,
//         eqnull: true,
//         browser: true
//       },
//       globals: {
//         jQuery: true
//       }
//     },
//     uglify: {}
//   });

//   // Default task.
//   grunt.registerTask('default', 'lint concat min');

// };
