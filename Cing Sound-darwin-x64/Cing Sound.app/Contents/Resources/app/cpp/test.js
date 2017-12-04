// test.js
const AsyncSPG = require('./build/Release/AsyncSPG');
var end = true;
var data = new Uint8Array(2048 * 3 * 8192);
AsyncSPG.GetData('/home/james/Downloads/bird.wav', 2048, 8192, -120, data, function (err) {
    console.log("called");
    end = false;
});
while(end){
    for(var i =0; i < 50000000; i++) {
	var q = 0;
	var f = q * q;
    }
    console.log(data.slice(0, 10));
    console.log(end);
}
