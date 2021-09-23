'use strict';

const APP_ENV = /^APP_/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => APP_ENV.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment();
