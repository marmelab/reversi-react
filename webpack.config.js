const path = require('path');

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
};
