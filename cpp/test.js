// test.js
const SPG = require('./build/Release/SPG');

const obj = new SPG.MyObject("/home/james/Downloads/bird.wav", 4096);
console.log(obj.getTimeResolution());
console.log(obj.getAudioLength());
console.log(obj.getFrequencyResolution());
console.log(obj.getNumFrequencyBins());
console.log(obj.getData());

