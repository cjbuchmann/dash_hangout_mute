var robot = require("robotjs");
var dhcpjs = require('dhcpjs');

var config = require('./config');

var server = dhcpjs.createServer();

server.on('message', function(m) {
  var address = m.chaddr.address;
  var messageName = m.options.dhcpMessageType.name;

  if (config.addresses.indexOf(address) > -1 && config.messageName === messageName) {
    robot.keyTap('d', 'command');
  }
});

server.on('listening', function(address) {
  console.log('listening on ' + address);
});

server.bind();
