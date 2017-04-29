// libraries
//const SPG = require('./cpp/build/Release/SPG');
const electron = require('electron');
const dataPointer = require('./cpp/build/Release/GetDataPointer');
var webframe = electron.webFrame;
const {ipcRenderer} = electron;
const {remote} = electron;
// disable zooming
webframe.setVisualZoomLevelLimits(1, 1)
webframe.setLayoutZoomLevelLimits(0, 0)
// functions
window.requestAnimationFrame = window.requestAnimationFrame || ( function() {
    return  window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(  callback, element ) {
	    window.setTimeout( callback, 1000 / 15 );
	};
})();
function animate() {
    if (dataChanged) {
	loadTexture();
	dataChanged = false;
    }
    if (hasChanged) {
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	glDraw();
	hasChanged = false;
    }
    requestAnimationFrame( animate );    
}

function onResize() {
    canvas.height = window.devicePixelRatio * canvas.clientHeight;
    canvas.width = window.devicePixelRatio * canvas.clientWidth;
    xCanvas.height = window.devicePixelRatio * xCanvas.clientHeight;
    xCanvas.width = window.devicePixelRatio * xCanvas.clientWidth;
    yCanvas.height = window.devicePixelRatio * yCanvas.clientHeight;
    yCanvas.width = window.devicePixelRatio * yCanvas.clientWidth;
}
function setGlobals() {
    lowestDB = 0;
    highestDB = 120;
    maxFrequency = 8000;
    dataOffset = 0;
    glWidth = 8192;
    numberOfBins = 2048;
    glHeight = numberOfBins;
    currentHighFrequency = maxFrequency;
    currentLowFrequency = 0;
    data = new Uint8Array(glWidth * glHeight * 3);
    var pointer = dataPointer.GetDataPointer(data);
    ipcRenderer.send('pointer', data);
}

function uiInit() {
    canvas = $("#container")[0];
    setGlobals();
    addZoom();
    xCanvas = $("#xAxis")[0];
    yCanvas = $("#yAxis")[0];
    onResize();
    ipcRenderer.once('replyFromMain', (event, arg) => {
	console.log(arg);
//	spg = new SPG.MyObject(arg); 
//	spg.getData(0, glHeight, glWidth, -120, data);
	xaxis = new xAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle);
	yaxis = new yAxis(window.getComputedStyle(document.body).fontSize,
			  window.getComputedStyle(document.body).fontStyle);
	glInit();
//	ipcRenderer.send('done with spg calculations', null);
	animate();
	
	
    });
}