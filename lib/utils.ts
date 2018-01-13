import winston = require('winston');

export function assert(msg: string, condition: boolean) {
  if (!condition) {
    throw new Error(msg);
  }
}

// from https://github.com/expressjs/express/issues/3308#issuecomment-300957572
export function printRoutesMap(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(printRoutesMap.bind(null, path.concat(split(layer.route.path))));
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(printRoutesMap.bind(null, path.concat(split(layer.regexp))));
  } else if (layer.method) {
    winston.info(`${layer.method.toUpperCase()} ${path.concat(split(layer.regexp)).filter(Boolean).join('/')}`);
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/');
  } else if (thing.fast_slash) {
    return '';
  } else {
    const match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>';
  }
}
