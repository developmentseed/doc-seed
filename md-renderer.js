'use strict';
var basename = require('path').basename;
var debug = require('debug')('metalsmith-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;

const md = require('markdown-it')({
  html: true,
  xhtmlOut: true
});
const attrs = require('markdown-it-attrs');
md.use(attrs);

// This code was copied form the plugin metalsmith-markdown (https://github.com/segmentio/metalsmith-markdown)
// This was done to change the markdown renderer to support custom attributes
// on elements. via https://stackoverflow.com/a/39214987

module.exports = plugin;
/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin (options) {
  options = options || {};
  var keys = options.keys || [];

  return function (files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      debug('checking file: %s', file);
      if (!markdown(file)) return;
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if (dir !== '.') html = dir + '/' + html;

      debug('converting file: %s', file);
      var str = md.render(data.contents.toString(), options);
      data.contents = new Buffer(str);
      keys.forEach(function (key) {
        data[key] = md.render(data[key], options);
      });

      delete files[file];
      files[html] = data;
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown (file) {
  return /\.md|\.markdown/.test(extname(file));
}
