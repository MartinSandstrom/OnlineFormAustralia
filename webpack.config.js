
module.exports = {
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: __dirname + '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            loader: 'babel-loader'
        }]
    }
};
