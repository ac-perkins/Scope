module.exports = function(grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: true
        },
            all: [ 'src/**/*.js' ]
        },

        sass: {               // task name
            project: {        // target name
                files: {
                    'build/css/main.css': 'src/scss/main.scss'
                }
            }
        },


        watch: {
            js: {
                files: [ 'src/**/*.js' ],
                tasks: [ 'js-build' ]
            },
            sass: {
                files: [ 'src/scss/*.scss' ],
                tasks: [ 'css-build' ]
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            }
        },

        clean: [ 'build/' ],

        copy: {
            html: {
                expand: true,
                src: ['**/*.html'],
                dest: 'build/',
                cwd: 'src/'
            },
            img: {
                expand: true,
                src: ['**/*.png'],
                dest: 'build/',
                cwd: 'src/'
            }
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            js: {
                src: [ 'src/app/blog.module.js', 'src/**/*.js' ],
                dest: 'build/js/app.js',
            },
        },


        karma: {
      app: {
        options: {
          frameworks: ['mocha', 'chai'],
          client: {
            mocha: {
              ui: 'tdd'
            }
          },
          browsers: ['PhantomJS'],
          singleRun: true,

          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dev/**/*.js',
            'test/specs/**/*.js'
          ],

          preprocessors: {
            'dev/create-author/*.js': ['coverage']
          },
          reporters: ['progress', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }
        }
      }
    }


    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('js-build', ['jshint', 'concat:js']);
    grunt.registerTask('css-build', ['sass']);
    grunt.registerTask('default', ['clean', 'copy', 'js-build', 'css-build']);
};
