const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	webpack.chainWebpack((config) => {
		config.plugin('DefinePlugin').tap((args) => {
			Object.assign(args[0], {
				'global.isAppRunInPreview': !!env.preview,
			});
			return args;
		});
	});

	return webpack.resolveConfig();
};
