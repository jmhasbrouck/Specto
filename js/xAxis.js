class xAxis {
    constructor(fontSize, fontStyle, audiolength) {
	this.xOffset = $("#container").offset().left + parseInt($("#container").css('border-left-width')) - $("#xAxis").offset().left;
	this.height = xCanvas.height;
	this.width = window.devicePixelRatio * $("#container")[0].clientWidth;
	this.numMajorTicks = majorXTicks;
	this.numMinorTicks = minorXTicks;
	this.minorTickSpacing = this.width / this.numMinorTicks;
	this.majorTickSpacing = this.width / (this.numMajorTicks - 1); // subtract one to account for the major tick at the far right of axis
	this.majorHeight = this.height / 6.0;
	this.minorHeight = this.height / 8.0;
	this.ctx = $("#xAxis")[0].getContext("2d");
	this.fontSize = fontSize;
	this.font = fontStyle;
	this.audiolength = audiolength;
	this.times = [];
	for (var i = 0 ; i < this.numMajorTicks; i++ ){
	    this.times.push(new Time(0,0,0));
	}
	this.drawAxis();
	this.redrawTimes(0,1);
    }
    drawAxis() {
	this.ctx.beginPath();
	this.ctx.strokeStyle = "#000000";
	// fill background black
	this.ctx.fillRect(this.xOffset,0, xCanvas.width, this.height);
	this.ctx.strokeStyle = "#FFFFFF";
	for (var i = 0; i < this.numMinorTicks; i++) {
	    this.ctx.moveTo(i*this.minorTickSpacing + this.xOffset, 0);
	    this.ctx.lineTo(i*this.minorTickSpacing + this.xOffset, this.minorHeight);
	}
	this.ctx.lineWidth = axisWidth;
	this.ctx.moveTo(this.xOffset,0);
	this.ctx.lineTo(this.width + this.xOffset, 0);
	
	for (var i = 0; i < this.numMajorTicks; i++) {
	    this.ctx.moveTo(i*this.majorTickSpacing + this.xOffset, 0);
	    this.ctx.lineTo(i*this.majorTickSpacing + this.xOffset, this.majorHeight);
	}
	this.ctx.stroke();
    }
    
    drawTimes() {
	this.ctx.font = this.fontSize.toString() + " " + this.font;
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.textBaseline = "top";
	var currentTime;
	for (var i = 0; i < this.times.length; i++) {
	    currentTime = this.times[i].getTime("mm:ss.ms");
	    this.ctx.fillText(currentTime,
			      this.xOffset + i*this.majorTickSpacing - this.ctx.measureText(currentTime).width / 2.0,
			      this.majorHeight);
	}
	this.ctx.fillText("Time", this.width/2.0 + this.xOffset, this.majorHeight*2.0); 
    }
    
    redrawTimes(min, max) {
	var step,time, divisions, count;
	divisions = this.numMajorTicks - 1;
	step = (max-min)/divisions;
	count = 0;
	for (var i = min ; count <= divisions ; i += step){
	    time = this.audiolength*1000*i;
	    this.times[count++].setMs(time);
	}
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0, this.majorHeight, xCanvas.width, xCanvas.height);
	this.drawTimes();
    }
    
    // sets an individual time -- not sure if this will be useful
    setTime(index, time) {
	if (index < this.times.length && index >= 0) {
	    this.times[index] = time;
	}
	else {
	    throw 'array out of bounds (setTime)';
	}
    }
    // copies the passed in times array and redraws the times to the screen
    setTimes(times) {
	if (times == typeof([]) && times.length == this.times.length) {
	    this.times = times.slice(); 
	    redrawTimes();
	}
	else {
	    throw 'bad parameter (setTimes)';
	}
    }
    setHeight(h) {
	this.height = h;
    }
    setWidth(w) {
	this.width = w;
    }
    setMajorTicks(major) {
	this.numMajorTicks = major;
    }
    setMinorTicks(minor) {
	this.numMinorTicks = minor;
    }
    setFont(font) {
	this.font = font;
    }
    setFontSize(size) {
	this.fontSize = size;
    }
}
