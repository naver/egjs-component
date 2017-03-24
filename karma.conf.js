module.exports = function(config) {
	var karmaConfig = {
		// 사용하는 프레임워크
		frameworks: ['mocha', 'chai', 'sinon'],

		// 브라우저에서 로드할 js pattern등
		files: [
			'./node_modules/phantomjs-polyfill/bind-polyfill.js',
			'./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
			'./node_modules/lite-fixture/index.js',
			'./test/**/*.spec.js'
		],

		// webpack 설정
		webpack: {
			devtool: 'inline-source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loader: "babel-loader",
						options: {
							presets: ["es2015"],
							plugins: ["add-module-exports"]
						}
					}
				]
			}
		},
		// in-memory로 하고 싶을 때 webpack-dev-middleware을 쓰는데 해당 옵션 설정
		webpackMiddleware: {
			// 정보들 안보이게 함
			noInfo: true
		},

		// karma을 실행할 때, 아래 패턴은 위에서 설정한 webpack설정.
		preprocessors: {
			'./test/**/*.spec.js': ['webpack']
		},

		// 리포트 타입(mocha)
		reporters: ['mocha'],

		// 브라우저 설정
		browsers: ["PhantomJS"]
	};

  // chrome을 설정한 경우
  if(config.chrome){
    karmaConfig.browsers = ["Chrome"];
  }

	// coverage을 설정한 경우
	if(config.coverage) {
			karmaConfig.preprocessors['./test/**/*.spec.js'].push('sourcemap');
			karmaConfig.reporters.push('coverage-istanbul');
			// text랑 html로 리포트
			karmaConfig.coverageIstanbulReporter = {
	      reports: [ 'text-summary' , 'html'],
				dir: './coverage'
			};
			// coverage의 순서을 위로
			karmaConfig.webpack.module.rules.unshift({
				test: /\.js$/,
				exclude: /(node_modules|test)/,
				loader: 'istanbul-instrumenter-loader'
			});
			karmaConfig.singleRun = true;
	}

	config.set(karmaConfig);
}
