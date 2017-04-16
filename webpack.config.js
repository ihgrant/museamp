var path = require('path');

module.exports = {
    entry: './app/App.jsx',
    module: {
        rules: [
            {
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                test: /\.jsx?$/
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static')
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    }
};
