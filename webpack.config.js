const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'inline-sourcemap',
    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'src'),
            loader: ['babel-loader'],
            query: {
                presets: ['react', 'es2015'],
            },
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
};
