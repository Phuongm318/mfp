const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const devConfig = {
	devtool: 'source-map',
	mode: 'development',
	devServer: {
		port: 8081,
		historyApiFallback: {
			index: 'index.html'
		}
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'marketing',
			filename: 'remoteEntry.js',
			exposes: {
				'./MarketingApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
}

module.exports = merge(commonConfig, devConfig);
