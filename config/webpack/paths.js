// https://github.com/facebook/create-react-app
'use strict';

const getPublicUrlOrPath = require('./getPublicUrlOrPath.js');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`)),
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appPublic: resolveApp('public'),
  appPopup: resolveModule(resolveApp, 'src/extensions/Popup/index'),
  appNewTab: resolveModule(resolveApp, 'src/extensions/NewTab/index'),
  appBackground: resolveModule(resolveApp, 'src/extensions/Background/index'),
  appContentScript: resolveModule(
    resolveApp,
    'src/extensions/ContentScript/index',
  ),
  appNewTabHtml: resolveApp('public/newtab.html'),
  appPopupHtml: resolveApp('public/popup.html'),
  babelConfig: resolveApp('config/babel.config.json'),
  publicUrlOrPath,
};
