const Interface = require("./interface");
const SerialPort = require('serialport');

class Serial extends Interface {
  constructor(port, options) {
    super();
    this.port = port || 'COM1'
    this.options = options || { 
      baudRate: 9600,
      autoOpen: false
    };
    this.printer = new SerialPort(this.port, this.options);
  }

  async isPrinterConnected() {
    return new Promise((resolve, reject) => {
      this.printer.open(function () {
        resolve(true);
      });
    });
  }

  async execute(buffer) {
    return new Promise((resolve, reject) => {
      this.printer.write(buffer, function () {
        resolve("Data sent to printer: ");
      });
    });
  }
}

module.exports = Serial;
