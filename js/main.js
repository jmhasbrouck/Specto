// libraries
const electron = require('electron');
var webframe = electron.webFrame;
const { ipcRenderer } = electron;
const { remote } = electron;
const dialog = remote.dialog;
// disable zooming
webframe.setVisualZoomLevelLimits(1, 1)
webframe.setLayoutZoomLevelLimits(0, 0)
// functions
function animate() {
    boundScaleAndTranslate();
    xaxis.redrawTimes(translate[0] - (1 / scale), translate[0] + (1 / scale));
    yaxis.redrawFrequencies(translate[1] - (1 / scale), translate[1] + (1 / scale));
    audioProgress = audio.getProgress() / audio.getDuration();

    $("#frequencydisplay")[0].innerHTML = mousefrequency.toString() + "hz | " + mousetime.getTime("mm:ss.ms");
    glDraw();
    requestAnimationFrame(animate);
}
function init() {
    canvas = $("#container")[0];
    xCanvas = $("#xAxis")[0];
    yCanvas = $("#yAxis")[0];
    setGlobals();
    addEventHandlers();
    drawLegend(-180, 0,
        window.getComputedStyle(document.body).fontSize,
        window.getComputedStyle(document.body).fontStyle);
    ipcRenderer.once('replyFromMain', (event, arg) => {
        filename = arg;
        console.log("filename: " + filename);
        document.title = filename;
        audio.loadFile(arg, ipcRenderer);
    });
}
