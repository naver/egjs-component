module.exports = function(config) {
	config.set({
		frameworks: ["qunit"],
		files: [
			// vendor files
			// src files
			"dist/eg.component.js",
			// test files
			"test/**/*.js"
		],
		browsers: ["PhantomJS"],
		singleRun: true
	});
};