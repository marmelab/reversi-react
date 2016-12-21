const path = require('path');
const ConfigPlugin = require('webpack-config-plugin');

const buildFolder = 'build';
const buildPath = path.resolve(__dirname, `./public/${buildFolder}`);

module.exports = {
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: buildPath,
        publicPath: `/${buildFolder}/`,
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, './src'),
            ],
            loader: 'babel',
        }],
    },
    plugins: [
        new ConfigPlugin({
            dir: path.join(__dirname, '/config/'),
        }),
    ],
};
