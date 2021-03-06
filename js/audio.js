var fs = require('fs');
spg = require('./cpp/build/release/SPG');
var noop = function () { };
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var ctx = new AudioContext();
var analyser = ctx.createAnalyser();
var pcmbuffer;
var audioElement;
var sourceNode;
var ctx
const fftSize = analyser.fftSize;
const frequencyBinCount = analyser.frequencyBinCount;

var audio = {};

audio.stop = function () { };

audio.playPause = function () {
    if (audioElement) {
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }
};

audio.loadFile = function (file, ipcRenderer) {
    audio.stop();
    return new Promise(function (resolve, reject) {
        if (!audioElement) {
            audioElement = $('#audioplayer')[0];
            audioElement.src = file;
            sourceNode = ctx.createMediaElementSource(audioElement);
            sourceNode.connect(analyser);
            fs.readFile(file, (err, data) => {
                var visualCtx = new AudioContext();
                visualCtx.decodeAudioData(data.buffer).then(function (audio_buffer) {
                    sampleRate = visualCtx.sampleRate;
                    var pcm_data = new Float64Array(audio_buffer.getChannelData(0));
                    maxFrequency = sampleRate;
                    audiolength = audio_buffer.duration;
                    xaxis = new xAxis(window.getComputedStyle(document.body).fontSize,
                        window.getComputedStyle(document.body).fontStyle, audiolength);
                    yaxis = new yAxis(window.getComputedStyle(document.body).fontSize,
                        window.getComputedStyle(document.body).fontStyle, 0, freqres * glHeight);
                    setGlobals();
                    spg.CalculateSpectrogram(glHeight, glWidth, -180, visualCtx.sampleRate, pcm_data.length, image_data, pcm_data);

                    glInit();
                    ipcRenderer.send('done with spg calculations', null);
                    animate();
                });
            })
            const once = function (target, event, callback) {
                const wrappedCallback = function () {
                    target.removeEventListener(event, wrappedCallback);
                    callback();
                };

                target.addEventListener(event, wrappedCallback);
            };
            once(audioElement, 'playing', resolve);
            once(audioElement, 'error', reject);
            once(audioElement, 'ended', audio.stop);
        }
    });
};

audio.bindPlayingListener = function (callback) {
    audio._callbacks = audio._callbacks ? audio._callbacks.concat(callback) : [callback];
    audioElement.addEventListener('playing', callback);
};

audio.releasePlayingListeners = function () {
    audio._callbacks.forEach((callback) => {
        audioElement.removeEventListener('playing', callback);
    });
};

audio.isPlaying = function () {
    return !!sourceNode && (audioElement && !audioElement.paused);
};

audio.getFloatWaveform = function (floatArray) {
    if (!arguments.length) {
        floatArray = new Float32Array(fftSize);
    }
    analyser.getFloatTimeDomainData(floatArray);
    return floatArray;
};

audio.getFloatFrequency = function (floatArray) {
    if (!arguments.length) {
        floatArray = new Float32Array(frequencyBinCount);
    }
    analyser.getFloatFrequencyData(floatArray);
    return floatArray;
};

audio.getProgress = function () {
    return audioElement.currentTime;
};

audio.getDuration = function () {
    return audioElement.duration;
};

audio.onEnded = noop;

audio.fftSize = fftSize;
audio.frequencyBinCount = frequencyBinCount;
audio.analyser = analyser;
module.exports = audio;
