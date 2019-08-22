const Interface = require("./interface");

class Serial extends Interface {
  constructor(port, options) {
    super();
    this.port = port || 'COM1'
    this.options = options || { 
      baudRate: 9600,
      autoOpen: false
    };
  }

  async execute(buffer) {
    return new Promise((resolve, reject) => {
      const SerialPort = require('serialport');
      var printer = new SerialPort(this.port, this.options);
      printer.write(buffer, function () {
        resolve("Data sent to printer: " + this.port);
        printer.destroy();
      });
  
      printer.on('error', function (error) {
        reject(error);
        printer.destroy();
      });
  
      printer.on('timeout', function () {
        reject(new Error("Socket timeout"));
        printer.destroy();
      });
    });
  }
}

module.exports = Serial;
