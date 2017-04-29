var mouseIsDown = false;
var lastX, lastY;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function mouseOverDiv() {
    openNav();
}

function addZoom() {
    $("#mySidenav").mouseleave(
	function() { closeNav()}
    );
    var $buttons = $('.zoombuttons');
    $(".zoom-out").on("click", function (e){
	$("#container").panzoom("pan", 0, 0);
    });
    $("#container").panzoom({
        $zoomIn: $buttons.find(".zoom-in"),
        $zoomOut: $buttons.find(".zoom-out"),
        $zoomRange: $buttons.find(".zoom-range"),
        $reset: $buttons.find(".reset"),
        panOnlyWhenZoomed: true,
	increment: 0.2,
        minScale: 1,
	maxScale: 7,
	 // Animation duration (ms)
	duration: 0,
	contain: 'automatic',
	onChange: function (e, panzoom, transform) {
	    //scale = transform[0];
	    console.log(transform);
	    gl.canvas.width = canvas.clientWidth * transform[0];
	    gl.canvas.height = canvas.clientHeight * transform[0];
	    hasChanged = true;
	}
    });
}
 

