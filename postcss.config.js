module.exports = {
  map: { inline: false },
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
