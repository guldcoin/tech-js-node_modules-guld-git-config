module.exports = [
  {
    mode: 'production',
    target: 'web',
    entry: {
      index: './index.js'
    },
    output: {
      filename: 'guld-git-config.min.js',
      path: __dirname,
      library: 'guldGitConfig',
      libraryTarget: 'var'
    }
  }
]
