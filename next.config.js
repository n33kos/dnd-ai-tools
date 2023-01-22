module.exports = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "src/components/styles/variables.scss"; @import "src/components/styles/mixins.scss";`,
  },
  webpack: function (config, options) {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    }
    return config;
  }
}
