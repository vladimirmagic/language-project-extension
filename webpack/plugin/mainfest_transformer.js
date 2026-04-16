const { rootPath } = require('../constants');
const fs = require('fs');

const transformManifest = (content) => {
  const manifest = JSON.parse(content.toString());
  const lastVersionPath = `${rootPath}/webpack/plugin/_manifestLastVersion`;

  let lastVersion = '';
  if (!fs.existsSync(lastVersionPath)) {
    lastVersion = ''+manifest.version;
  } else {
    lastVersion = fs.readFileSync(lastVersionPath).toString();
  }
  const version = incrementVersion(lastVersion);
  fs.writeFileSync(lastVersionPath, version);
  manifest.version = version;
  return JSON.stringify(manifest, null, 4);
}

const incrementVersion = (version) => {
  const list = (version || '').split('.');
  if (!list || list.length < 3) {
    return '1.0.0';
  }
  list[1] = parseInt(list[1]) + 1;
  return list.join('.').trim();
}

module.exports = {
  transformManifest
}