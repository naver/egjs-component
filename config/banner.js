const pkg = require("../package.json");

module.exports = `/*
Copyright (c) 2017 ${pkg.author.name}
${pkg.name} project is licensed under the ${pkg.license} license

${pkg.name} JavaScript library
${pkg.homepage}

@version ${pkg.version}
*/`;
