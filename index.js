var robot = require("robotjs");

var dhcpjs = require('dhcpjs');
var util = require('util');

var config = require('./config');

var server = dhcpjs.createServer();

var locked = false;
server.on('message', function(m) {
  var address = m.chaddr.address;

  if (config.addresses.indexOf(address) > -1 && !locked) {
    robot.keyTap('d', 'command');

    locked = true;
    setTimeout(function(){
      locked = false;
    }, 1000);
  }
});

server.on('listening', function(address) {
  console.log('listening on ' + address);
});

server.bind();
