class yAxis {
    constructor(fontSize, fontStyle, minfreq, maxfreq) {
	this.yOffset = xaxis.height + parseInt($("#container").css('border-bottom-width')) + axisWidth/2;
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
	this.minFrequency = minfreq;
	this.maxFrequency = maxfreq;
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
	this.ctx.textAlign = 'center';
	this.ctx.textBaseline = "middle";
	var currentFrequency, step, currentIncrement, middlePosX, middlePosY, numberWidth;
	step = (this.maxFrequency - this.minFrequency) / (this.numMajorTicks - 1);
	numberWidth = this.ctx.measureText("44150.0").width;
	for (var i = 0; i < this.numMajorTicks; i++) {
	    currentIncrement = ((this.numMajorTicks - 1) - i);
	    currentFrequency = (this.minFrequency +  currentIncrement*step).toFixed(1);
	    middlePosX = this.width - (this.width-this.majorWidth) - numberWidth/2;
	    middlePosY = this.yOffset + i*this.majorTickSpacing;
	    this.ctx.fillText(currentFrequency.toString(), middlePosX, middlePosY);
	}
	this.ctx.save();
	this.ctx.font = "bold " + this.ctx.font;
	this.ctx.textBaseline = 'top';
	this.ctx.translate(3, this.height/2 + this.yOffset);
	this.ctx.rotate(-Math.PI/2);
	this.ctx.fillText("Frequency (hz)", 0, 0);
	this.ctx.restore();
	this.ctx.stroke();
    }
    redrawFrequencies(min, max) {
	this.minFrequency=freqres * glHeight * min;
	this.maxFrequency=freqres * glHeight * max;
	this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0, 0, this.width, this.height + this.yOffset*2.0);
	this.drawFrequencies();
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
