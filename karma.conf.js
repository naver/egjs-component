module.exports = function(config) {
	config.set({
		frameworks: ["qunit"],
		files: [
			// vendor files
			// test files
			"dist/component.test.js"
		],
		browsers: ["PhantomJS"],
		singleRun: true
	});
};
