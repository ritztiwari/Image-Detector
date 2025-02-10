const webpack = require('webpack');

module.exports = function override(config, env) {
  config.plugins = config.plugins.filter(
    plugin => !(plugin instanceof webpack.DefinePlugin)
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        ...process.env,
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  );

  config.optimization = {
    ...config.optimization,
    minimize: false
  };

  config.resolve = {
    ...config.resolve,
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      zlib: require.resolve('browserify-zlib'),
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
    },
    alias: {
      ...config.resolve.alias,
      'process/browser': require.resolve('process/browser.js')
    }
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );

  return config;
}; 