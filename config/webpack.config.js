/** @format */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('./bundle.config.js');

module.exports = env => {
	const baseConfig = env.production ? config.prod : config.dev;

	return {
		...baseConfig,
		output: {
			path: path.resolve(__dirname, '../public'),
			publicPath: '/',
			filename: '[name].bundle-[hash].js',
			chunkFilename: '[name].bundle-[hash].js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/react', '@babel/env']
						}
					}
				},
				{
					test: /\.(scss|css)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: path.resolve(__dirname)
								}
							}
						}
					]
				},
				{
					test: /\.(jpg|png|gif|svg|pdf|ico)$/,
					use: ['file-loader']
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: ['url-loader?limit=10000&fallback=file-loader']
				}
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						chunks: 'initial',
						name: 'vendor',
						test: 'vendor',
						enforce: true
					}
				}
			},
			runtimeChunk: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/client/index.html'
			}),
			...baseConfig.plugins
		]
	};
};
