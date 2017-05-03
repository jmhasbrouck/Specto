const panzoom = require('pan-zoom');
const screenshot = require('electron-screenshot')
function openNav() {
    document.getElementById("mySidenav").style.width = "40vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function mouseOverDiv() {
    openNav();
}


function addEventHandlers() {
    $("#mySidenav").mouseleave(
	function() { closeNav()}
    );
    $("#close").on('click', function () {
	ipcRenderer.send('closeall');
    });
    $("#opennew").on('click', function () {
	ipcRenderer.send('restart app');
    });
    $("#screenshot").on('click', function() {
	$("#mySidenav").hide(0);
	dialog.showSaveDialog({
		 filters: [
		     {name: 'PNG file', extensions: ['png']},
		 ], title:filename
	}, function(name) {
	    if (name && name != undefined) {
		screenshot({filename:name});
	    }
	});
	$("#mySidenav").show(0);
    });
   panzoom(canvas, e => {
        //e contains all the params related to the interaction 
	
        //pan deltas 
        translate[0] -=e.dx/400/scale;
        translate[1] +=e.dy/400/scale;
	
        //zoom delta 
        scale -= e.dz/400;
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
 

