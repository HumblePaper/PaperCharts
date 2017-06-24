module.exports = function(grunt) { 

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['chart.js'],
            options: {
                destination: 'documents'
            }
        }
    }
});
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.registerTask('default', 'jsdoc2md');
grunt.initConfig({
    jsdoc2md: {
      oneOutputFile: {
        src: 'chart.js',
        dest: 'doc/README.md'
      }
    }
  });
}

