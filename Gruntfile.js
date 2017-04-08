/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  global.pkg = {
    jet_version: '3.0.0'
  };
  global.connect = {
    port: "8080"
  }; 
  global.dirs = {
    output_scss: "scss/oj/v<%= pkg.jet_version %>/",
    output_css: "css/libs/oj/v<%= pkg.jet_version %>/"
  };
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn:false,
          livereload:35729
        }
      },
      serve: {
            options: {
                livereload:35729,
                spawn:false
            },
            files:['**/*.*'],
            tasks:'sass'
        }
    },
    sass: {
      expanded: {
        options: {
          outputStyle: 'nested',
          sourceMap: true
        },
        files: [{
            expand: true,
            cwd: '<%= dirs.output_scss %>/',
            src: ['**/*.scss', '!**/_*.scss'],
            dest: '<%= dirs.output_css %>/',
            ext: '.css'
          }]
      },
      compressed: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
            expand: true,
            cwd: '<%= dirs.output_scss %>/',
            src: ['**/*.scss', '!**/_*.scss'],
            dest: '<%= dirs.output_css %>/',
            ext: '-min.css'
          }]
      }
    },
    connect: {	  
        serve: {
            options: {
                //port:'<%= connect.port %>',
                open: false,
                keepalive:true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
		        base: {
                    path: '.',
                    options: {
                        index: 'home.html'
                    }
                }        
            }
        }
      }
  });

  grunt.registerTask('default', ['sass']);
  grunt.registerTask('serve', ['watch','connect:serve']);
};
