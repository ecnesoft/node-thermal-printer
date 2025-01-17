

function getInterface (uri, options) {
  const networkRegex = /^tcp:\/\/([^\/:]+)(?::(\d+))?\/?$/i;
  const printerRegex = /^printer:([^\/]+)(?:\/([\w-]*))?$/i;

  const net = networkRegex.exec(uri);
  const printer = printerRegex.exec(uri);

  if (typeof uri === "object") {
    return uri;
  } else if (net) {
    const Network = require('./network');
    return new Network(net[1], net[2], options);
  } else if (printer) {
    const Printer = require('./printer');
    return new Printer(printer[1], printer[2]);
  } else {
    const Serial = require('./serial');
    return new Serial(uri, options);
  }
}

module.exports = getInterface;
