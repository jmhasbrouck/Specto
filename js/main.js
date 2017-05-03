// libraries
const SPG = require('./cpp/build/Release/SPG');
const electron = require('electron');
var webframe = electron.webFrame;
const {ipcRenderer} = electron;
const {remote} = electron;
const dialog = remote.dialog;

// disable zooming
webframe.setVisualZoomLevelLimits(1, 1)
webframe.setLayoutZoomLevelLimits(0, 0)
// functions
function animate() {
    boundScaleAndTranslate();
    xaxis.redrawTimes(translate[0] - (1/scale), translate[0]+(1/scale));
    yaxis.redrawFrequencies(translate[1] - (1/scale), translate[1] + (1/scale));
    audioProgress = audio.getProgress() / audio.getDuration();
    glDraw();
    requestAnimationFrame( animate );    
}
function init() {
    canvas = $("#container")[0];
    xCanvas = $("#xAxis")[0];
    yCanvas = $("#yAxis")[0];
    setGlobals();
    addEventHandlers();
    ipcRenderer.once('replyFromMain', (event, arg) => {
	filename = arg;
	document.title = filename;
	audio.playFile(arg);
	spg = new SPG.MyObject(arg); 
	spg.getData(glHeight, glWidth, -120, data);
	xaxis = new xAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle, spg.getAudioLength());
	yaxis = new yAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle, 0, spg.getFrequencyResolution()*glHeight);
	glInit();
	ipcRenderer.send('done with spg calculations', null);
	animate();
    });
}
