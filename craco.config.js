// craco.config.js
module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        url: require.resolve('url/')
      };
      return config;
    }
  }
};
