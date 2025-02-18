const path = require('path');

module.exports = {
    // ... other webpack config
    module: {
        rules: [
            // ... other rules
            {
                test: /\.svg$/,
                include: [path.join(__dirname, "src/assets")],
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            // SVGR options can go here
                        },
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};