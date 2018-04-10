const decode = require('audio-decode')
const buffer = require('audio-lena/mp3')
var fs = require('fs');
var spg = require('./build/Debug/SPG')
if (process.argv.length < 1) {
    console.log("arg1 - path of the sound file (and only use wav!)");
    exit(0);
}
fs.readFile(process.argv[1], (err, data) => {
    decode(buffer).then(audio_buffer => {
        sampleRate = (audio_buffer.length/ audio_buffer.numberOfChannels) / audio_buffer.duration;
        var pcm_data = new Float64Array(audio_buffer.getChannelData(0));
        maxFrequency = sampleRate;
        spg.CalculateSpectrogram(8192, 4096, -180, sampleRate, pcm_data.length, new Uint8Array(4096 * 8192 * 3), pcm_data);
        glInit();
        ipcRenderer.send('done with spg calculations', null);
    }, err => {
        console.log(err)
    }) 
})