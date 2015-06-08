var Crier = require('./crier.js');

Crier.sub('channel1', function (channel, a, b) {
  console.log(channel + ' fired: ', a, b);
});

Crier.pub('channel1', 1,2);
