var dest = './static',
  src = './src',
  mui = './node_modules/material-ui/src';

module.exports = {
  // browserSync: {
  //   server: {
  //     // We're serving the src folder as well
  //     // for sass sourcemap linking
  //     baseDir: [dest, src]
  //   },
  //   files: [
  //     dest + '/**'
  //   ]
  // },
  markup: {
    src: src + "/**",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/App.js',
      dest: dest,
      outputName: 'bundle.js'
    }],
    extensions: ['.js'],
  }
};
