import defaultConfig from './default';

const processEnv = process.env.NODE_ENV;
let envConfig = {};

if (processEnv) {
  envConfig = require(`./${processEnv}`) || {};
}

export default {
  ...defaultConfig,
  ...envConfig
};
