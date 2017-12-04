const panzoom = require('pan-zoom');
const screenshot = require('electron-screenshot')
var border_width;
var border_height;
function openNav() {
    document.getElementById("mySidenav").style.width = "40vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function mouseOverDiv() {
    openNav();
}
function calcMouseBasedFrequencyTimeDiv(x, y) {
    var canvas_adjusted_height = canvas.clientHeight;
    var canvas_adjusted_width = canvas.clientWidth;
    
    var mouse_position_bottom = (((canvas_adjusted_height - y)/canvas_adjusted_height) * (2/scale)) + (translate[1]-(1/scale));
    var mouse_left = ((x/canvas_adjusted_width) * (2/scale) + (translate[0] - (1/scale)));

    mouse_left = Math.min(1, mouse_left);
    mouse_left = Math.max(0, mouse_left);
    mouse_position_bottom = Math.min(1, mouse_position_bottom);
    mouse_position_bottom = Math.max(0, mouse_position_bottom);
    if (mouse_left || mouse_left != undefined) {
	mousetime.setMs(mouse_left*audiolength*1000);
    }
    else {
	mousetime.setMs(0);
    }
    mousefrequency = (mouse_position_bottom * freqres * glHeight).toFixed(2);
}

function addEventHandlers() {
    border_width = parseInt($("#container").css('border-left-width'));
    border_height = parseInt($("#container").css('border-bottom-width'));
    console.log(border_height);
    $("#mySidenav").mouseleave(
	function() { closeNav(); }
    );
    $("#close").on('click', function () {
	ipcRenderer.send('closeall');
    });
    $("#opennew").on('click', function () {
	ipcRenderer.send('restart app');
    });
    $("#screenshot").on('click', function() {
	$("#mySidenav").hide(0);
	$("#frequencydisplay").hide(0);
	dialog.showSaveDialog({
		 filters: [
		     {name: 'PNG file', extensions: ['png']},
		 ], title:filename
	}, function(name) {
	    if (name && name != undefined) {
		screenshot({filename:name});
	    }
	    $("#mySidenav").show(0);
	    $("#frequencydisplay").show(0);
	    
	});
	
    });
    $("#container").on("mousemove", function (event) {
	
	mousepos[0] = event.clientX - canvas.getBoundingClientRect().left - border_width;
	mousepos[1] = event.clientY - canvas.getBoundingClientRect().top - border_height;
	calcMouseBasedFrequencyTimeDiv(mousepos[0], mousepos[1]);
    });
   panzoom(canvas, e => {
       //e contains all the params related to the interaction 
       //pan deltas 
       translate[0] -=e.dx/400/scale;
       translate[1] +=e.dy/400/scale;
       //zoom delta 
       scale -= e.dz/400;
       calcMouseBasedFrequencyTimeDiv(mousepos[0], mousepos[1]);
    });  
}
function boundScaleAndTranslate() {
    scale = Math.max(2, scale);
    scale = Math.min(40, scale);
    translate[0] = Math.max(translate[0], (1/scale));
    translate[0] = Math.min(translate[0], 1-(1/scale));
    translate[1] = Math.max(translate[1], (1/scale));
    translate[1] = Math.min(translate[1], 1-(1/scale));
}
 

