import { Configuration } from 'webpack';
const config: Configuration = {
  entry: './src/index.js',

  mode: 'production',

  output: {
    filename: '[name].[chunkhash:8].js',
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          test: /common/,
          enforce: true,
        },
        'module-1': {
          test: /module-1/,
          enforce: true,
        },
        'module-2': {
          test: /module-2/,
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },
};

export default config;
