class yAxis {
    constructor(fontSize, fontStyle) {
	this.yOffset = xaxis.height + parseInt($("#border").css('border-left-width'));
	this.height = yCanvas.height - this.yOffset * 2.0;
	this.width = yCanvas.width;
	this.numMajorTicks = majorYTicks;
	this.numMinorTicks = minorYTicks;
	this.minorTickSpacing = this.height / this.numMinorTicks;
	this.majorTickSpacing = this.height / (this.numMajorTicks - 1); // subtract one to account for the major tick at the far right of axis
	this.majorWidth = this.width - this.width / 8.0;
	this.minorWidth = this.width - this.width / 16.0;
	this.ctx = $("#yAxis")[0].getContext("2d");
	this.fontSize = fontSize;
	this.font = fontStyle;
	this.minFrequency = 0;
	this.maxFrequency = 8000;
	this.drawAxis();
	this.drawFrequencies();
    }
    drawAxis() {
	this.ctx.beginPath();
	this.ctx.lineWidth = axisWidth;
	this.ctx.strokeStyle = "#000000";
	// fill background black
	this.ctx.fillRect(0,0, yCanvas.width, yCanvas.height - this.yOffset);
	this.ctx.strokeStyle = "#FFFFFF";
	for (var i = 0; i < this.numMinorTicks; i++) {
	    this.ctx.moveTo(this.minorWidth,i*this.minorTickSpacing + this.yOffset);
	    this.ctx.lineTo(this.width, i*this.minorTickSpacing + this.yOffset);
	}
	
	this.ctx.moveTo(this.width,this.yOffset);
	this.ctx.lineTo(this.width, this.yOffset + this.height);
	
	for (var i = 0; i < this.numMajorTicks; i++) {
	    this.ctx.moveTo(this.width, i*this.majorTickSpacing + this.yOffset);
	    this.ctx.lineTo(this.majorWidth, i*this.majorTickSpacing + this.yOffset);
	}
    }
    drawFrequencies() {
	this.ctx.font = this.fontSize.toString() + " " + this.font;
	this.ctx.fillStyle = "#FFFFFF";
	this.ctx.textBaseline = "middle";
	var currentFrequency;
	for (var i = 0; i < this.numMajorTicks; i++) {
	    currentFrequency = (this.minFrequency + ((this.numMajorTicks - 1) - i) * (this.maxFrequency / (this.numMajorTicks - 1))).toFixed(1);
				this.ctx.fillText(currentFrequency.toString(),
			      (this.width - this.ctx.measureText(currentFrequency).width) / 2,
			      this.yOffset + i*this.majorTickSpacing);
	}
	this.ctx.stroke();
    }
    redrawFrequencies() {
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0, this.majorHeight, xCanvas.width, xCanvas.height);
	drawFrequencies();
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
    setMinFrequency(min) {
	this.minFrequency = min;
    }
    setMaxFrequency(max) {
	this.maxFrequency = max;
    }
}
