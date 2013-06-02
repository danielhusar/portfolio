module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //concat files
    concat: {
      options: {
        separator: '\n\n'
      },
      app : {
        src: ['public/js/global.js', 'public/js/settings.js', 'public/js/libraries/internal/*.js', 'public/js/events.js', 'public/js/routes.js', 'public/js/init.js'],
        dest: 'public/js/packed/app.js'
      },
      plugins : {
        src: ['public/js/libraries/external/*.js', 'public/js/plugins/*.js', '!**/*min.js'],
        dest: 'public/js/packed/plugins.js'
      }
    },
    //uglify files
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("mm.dd.yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/packed/app.min.js': ['<%= concat.app.dest %>'],
          'public/js/packed/plugins.min.js': ['<%= concat.plugins.dest %>']
        }
      }
    },
    //lint
    jshint: {
      files: ['<%= concat.app.src %>']
    },
    //watch files
    watch: {
      files: ['<%= concat.app.src %>', '<%= concat.plugins.src %>'],
      tasks: ['concat', 'uglify']
    },
    //tests
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true
        }
      }
    },
    //reports
    plato: {
      main: {
        files: {
          'reports': ['public/js/*.js', '!**/*min.js']
        }
      }
    }
  });

  //Dependencies
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-plato');

  //Tasks  

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'mocha']);
  grunt.registerTask('development', ['concat', 'uglify', 'watch']);
  grunt.registerTask('production', ['concat', 'uglify']);

  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('tests', ['mocha']);
  grunt.registerTask('reports', ['plato']);

  return grunt;

};