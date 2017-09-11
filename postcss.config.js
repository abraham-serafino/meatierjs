module.exports = {
  map: { inline: true },
  parser: 'postcss-scss',
  plugins: [
    require('autoprefixer')(),
    require('css-mqpacker')(),
    require('cssnano')(),
    require('lost')(),
    require('postcss-assets')(),
    require('postcss-cssnext')(),
    require('precss')()
  ]
};
