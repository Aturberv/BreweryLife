module.exports = {
  stripPrefixMulti: {
    'build/':'/',
    'ssr/':'/'
  },
  staticFileGlobs: [
    'build/*.html',
    'build/*.json',
    'build/static/**/!(*map*)',
    'ssr/**/*'
  ],
  runtimeCaching:[
    {
        urlPattern: /(bootstrap|fonts|polyfill|raven|btncdn|untappd|gstatic|photoreference)/,
        handler: 'fastest'
    }
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: './build/service-worker.js',
  navigateFallback: 'index.html'
};