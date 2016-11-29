const path = require('path');

module.exports = {
    watch: true,
    entry: './src/client/client.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/public/'),
        publicPath: '/public/',
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
};
