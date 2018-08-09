const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

module.exports = {
  webpack(config, {dev}) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config
  }
}