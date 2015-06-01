/**
@toc
2. load grunt plugins
3. init
4. setup variables
5. grunt.initConfig
6. register grunt tasks

*/

'use strict';

module.exports = function(grunt) {

	/**
	Load grunt plugins
	@toc 2.
	*/
	// grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-less');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-karma');

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	/**
	Function that wraps everything to allow dynamically setting/changing grunt options and config later by grunt task. This init function is called once immediately (for using the default grunt options, config, and setup) and then may be called again AFTER updating grunt (command line) options.
	@toc 3.
	@method init
	*/
	function init(params) {
		/**
		Project configuration.
		@toc 5.
		*/
		grunt.initConfig({
			concat: {
				devCss: {
					src:    [],
					dest:   []
				}
			},
			jshint: {
				options: {
					//force:          true,
					globalstrict:   true,
					//sub:            true,
					node: true,
					loopfunc: true,
					browser:        true,
					devel:          true,
					globals: {
						angular:    false,
						$:          false,
						moment:		false,
						Pikaday: false,
						module: false,
						forge: false
					}
				},
				beforeconcat:   {
					options: {
						force:	false,
						ignores: ['src/**.min.js']
					},
					files: {
						src: []
					}
				},
				//quick version - will not fail entire grunt process if there are lint errors
				beforeconcatQ:   {
					options: {
						force:	true,
						ignores: ['**.min.js']
					},
					files: {
						src: ['dist/angular-textcolor.js']
					}
				}
			},
			uglify: {
				options: {
					mangle: false
				},
				build: {
					files:  [
                        {src: 'dist/angular-textcolor.js', dest: 'dist/angular-textcolor.min.js'},
                        {src: 'dist/angular-textcolor.js', dest: 'demo/scripts/angular-textcolor.min.js'}
                    ]
				}
			},
            express: {
                all: {
                    options:{
                        port: 9000,
                        hostname: "0.0.0.0",
                        bases: ["demo"],
                        livereload: true
                        // No need for keepalive anymore as watch will keep Grunt running
                        //keepalive: true,
                    }
                }
            },
            // grunt-watch will monitor the projects files
            watch: {
                all: {
                    // Replace with whatever file you want to trigger the update from
                    // Either as a String for a single entry 
                    // or an Array of String for multiple entries
                    // You can use globing patterns like `css/**/*.css`
                    // See https://github.com/gruntjs/grunt-contrib-watch#files
                    files: 'index.html',
                        options: {
                          livereload: true
                    }
                },
                js: {
                    files: ['dist/angular-textcolor.js'],
                    tasks: ['uglify:build'],
                        options: {
                          livereload: true
                    }
                }
            }
            // // grunt-open will open your browser at the project's URL
            // open: {
            //   all: {
            //     // Gets the port from the connect configuration
            //     path: 'http://localhost:<%= connect.all.options.port%>'
            //   }
            // },
            /*,
            karma: {
                unit: {
                    configFile: demoPathRelativeRoot+'config/karma.conf.js',
                    singleRun: true,
                    browsers: ['PhantomJS']
                }
            }*/
		});
		/**
		register/define grunt tasks
		@toc 6.
		*/
		// Default task(s).
		// grunt.registerTask('default', ['jshint:beforeconcat', 'less:development', 'concat:devJs', 'concat:devCss']);
		grunt.registerTask('default', ['jshint:beforeconcatQ', 'uglify:build']);
		// Creates the `server` task
		grunt.registerTask('server',[
			// Starts the livereload server to which the browser will connect to
			// get notified of when it needs to reload
			'express',
			// Connect is no longer blocking other tasks, so it makes more sense to open the browser after the server starts
			// 'open',
			// Starts monitoring the folders and keep Grunt alive
			'watch'
		]);

	
	}
	init({});		//initialize here for defaults (init may be called again later within a task)

};