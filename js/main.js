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
    
    $("#frequencydisplay")[0].innerHTML = mousefrequency.toString() + "hz | " + mousetime.getTime("mm:ss.ms");
    glDraw();
    requestAnimationFrame( animate );    
}
function init() {
    canvas = $("#container")[0];
    xCanvas = $("#xAxis")[0];
    yCanvas = $("#yAxis")[0];
    setGlobals();
    addEventHandlers();
    drawLegend(-120, 0,
	       window.getComputedStyle(document.body).fontSize,
	       window.getComputedStyle(document.body).fontStyle);
    ipcRenderer.once('replyFromMain', (event, arg) => {
	filename = arg;
	document.title = filename;
	audio.playFile(arg);
	$("#filenameheader")[0].innerHTML = filename.split('/').slice(-1)[0];
	
	if (arg.slice(-3) == "wav") {
	    spg = new SPG.MyObject(arg); 
	    spg.getData(glHeight, glWidth, -120, data);
	    audiolength = spg.getAudioLength();
	    freqres = spg.getFrequencyResolution();
	}
	else {
	    // todo: add more file types
	}

	xaxis = new xAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle, audiolength);
	yaxis = new yAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle, 0, freqres*glHeight);
	glInit();
	ipcRenderer.send('done with spg calculations', null);
	animate();
    });
}
