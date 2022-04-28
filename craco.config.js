const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@primary-color': '#38615F',
							'@layout-sider-background': '#1B4543',
							'@layout-header-background': '#fff'
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};