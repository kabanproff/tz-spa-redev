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
							'@layout-header-background': '#fff',
							// '@black': '#38615F',
							'@label-color': 'fade(#38615F, 85%)',
							'@modal-heading-color': '@label-color',
							'@normal-color': '#1B4543',
							'@modal-header-padding': '25px 46px 10px',
							'@modal-body-padding': '10px 46px 30px',

						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};