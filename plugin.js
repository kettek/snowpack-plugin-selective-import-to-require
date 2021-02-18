/**
 * A selective import to require snowpack plugin. It simply converts any calls to `import` a module provided in the pluginOptions.modules array to a `require` for all files that match the pluginOptions.types extensions array.
 *
 * @param {object} snowpackConfig The snowpack configuration.
 * @param {object} pluginOptions The plugin options.
 * @param {string[]} [pluginOptions.modules=[]] An array of module names to match against.
 * @param {string[]} [pluginOptions.types=['.js']] An array of file extensions to match against, including the leading dot.
 * @param {boolean} [pluginOptions.externalize=true] Whether or not the passed modules should be added to snowpack's packageOptions.external array.
 * @returns {object} The snowpack plugin.
 */
module.exports = function selectiveImportToRequire(snowpackConfig, pluginOptions) {
  const regexp = new RegExp("^import (?<variableName>((?!from).|\n)*?) from (?<moduleName>(?:'|\")(?:"+(pluginOptions.modules||[]).join('|')+")(?:'|\")).*$", "gm")
  const filetypes = pluginOptions.types || ['.js']
  if (pluginOptions.externalize === undefined || pluginOptions.externalize === true) {
    snowpackConfig.packageOptions.external = [...snowpackConfig.packageOptions.external, ...pluginOptions.modules]
  }
  return {
    name: 'snowpack-plugin-selective-import-to-require',
    async transform({ id, contents, isDev, fileExt }) {
      if (filetypes.includes(fileExt)) {
        return contents.replace(
          regexp,
          'const $<variableName> = require($<moduleName>)'
        )
      }
    }
  };
};
