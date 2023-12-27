/** @typedef {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} Config */

/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 * @type Config
 */
const overridableDefaults = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
};

/** @type Config */
const config = {
  ...overridableDefaults,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
