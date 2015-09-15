module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      default: {
        files: {
          'css/components.opentok.css': 'less/theme.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 versions']
      },
      dist: {
        src: 'css/*.css'
      },
    },

    concat: {
      default: {
       src: [
          '../icons/fonts/icons.css',
          'css/components.opentok.css',
        ],
        dest: 'css/components.opentok.css'
      }
    },

    copy: {
      eot: {
        src: '../icons/fonts/icons.eot',
        dest: 'css/icons.eot',
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/components.opentok.min.css': 'css/components.opentok.css'
        }
      }
    },

    watch: {
      styles: {
        files: ['../**/*.less'],
        tasks: ['less','concat','autoprefixer','cssmin'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', [
    'copy',
    'less',
    'concat',
    'autoprefixer',
    'cssmin',
    'watch'
  ]);

};
