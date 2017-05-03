// defines
const canvasHeightPercentage = 0.85;
const canvasWidthPercentage = 0.85;
const xAxisHeightPercentage = 0.05;
const minorXTicks = 150;
const majorXTicks = 6;
const minorYTicks = 80;
const majorYTicks = 9;
const axisWidth = 2;
// globals
var spg;
var canvas;
var xCanvas;
var yCanvas;
var xaxis;
var yaxis;
var webGl;
var filename;
var data;
var glData;
var lowestDB;
var highestDB;
var dataOffset;
var maxFrequency;
var currentHighFrequency;
var currentLowFrequency;
var glWidth;
var glHeight;
var numberOfBins;
var hasChanged = true;
var dataChanged = true;
var scale = 2;
var translate = [0.5, 0.5];
var audioProgress = 0;

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
    canvas.height = window.devicePixelRatio * canvas.clientHeight;
    canvas.width = window.devicePixelRatio * canvas.clientWidth;
    xCanvas.height = window.devicePixelRatio * xCanvas.clientHeight;
    xCanvas.width = window.devicePixelRatio * xCanvas.clientWidth;
    yCanvas.height = window.devicePixelRatio * yCanvas.clientHeight;
    yCanvas.width = window.devicePixelRatio * yCanvas.clientWidth;
    data = new Uint8Array(glWidth * glHeight * 3);
}

window.requestAnimationFrame = window.requestAnimationFrame || ( function() {
    return  window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(  callback, element ) {
	    window.setTimeout( callback, 1000 / 15 );
	};
})();
