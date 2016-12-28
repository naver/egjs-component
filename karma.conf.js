module.exports = function(config) {
	config.set({
		frameworks: ["qunit"],
		files: [
			// vendor files
			// test files
			"dist/eg.component.test.js"
		],
		browsers: ["PhantomJS"],
		singleRun: true
	});
};
