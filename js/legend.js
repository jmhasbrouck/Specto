function drawLegend(mindb, maxdb, fontSize, fontStyle) {
    /* These values were originally calculated for a dynamic range of 180dB. */
var colors = [
    [	255, 255, 255 ],  /* -0dB */
    [	240, 254, 216 ],  /* -10dB */
    [	242, 251, 185 ],  /* -20dB */
    [	253, 245, 143 ],  /* -30dB */
    [	253, 200, 102 ],  /* -40dB */
    [	252, 144,  66 ],  /* -50dB */
    [	252,  75,  32 ],  /* -60dB */
    [	237,  28,  41 ],  /* -70dB */
    [	214,   3,  64 ],  /* -80dB */
    [	183,   3, 101 ],  /* -90dB */
    [	157,   3, 122 ],  /* -100dB */
    [	122,   3, 126 ],  /* -110dB */
    [	 80,   2, 110 ],  /* -120dB */
    [	 45,   2,  89 ],  /* -130dB */
    [	 19,   2,  70 ],  /* -140dB */
    [	  1,   3,  53 ],  /* -150dB */
    [	  1,   3,  37 ],  /* -160dB */
    [	  1,   2,  19 ],  /* -170dB */
    [	  0,   0,   0 ]  /* -180dB */ ];
    
    var ctx = $("#mouseDiv")[0].getContext("2d");
    var height = $("#mouseDiv")[0].height ;
    var width = $("#mouseDiv")[0].width ;
    var legendHeight = 0.5 * height;
    var legendWidth = 0.2 * width;
    var gradient = ctx.createLinearGradient((width/2.0) - (legendWidth/2.0),
					    (height/2.0) - (legendHeight/2.0),
					    width/2.0 + (legendWidth),
					    height/2.0 + legendHeight);
    for (var i = 0 ; i < colors.length; i++) {
	console.log(i, colors[i][0], i/colors.length);
	gradient.addColorStop((i/colors.length).toString(), 'rgba(' + colors[i][0] + ',' + colors[i][1] + ',' + colors[i][2] + ',1)');
    }
    console.log(colors);
    ctx.fillStyle = gradient;
    ctx.fillRect((width/2.0) - (legendWidth/2.0),
		 (height/2.0) - (legendHeight/2.0),
		 legendWidth,
		 legendHeight);
    ctx.font = fontSize.toString() + " " + fontStyle;
    ctx.textBaseline = "top";
    ctx.textAlign="center";
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeRect((width/2.0) - (legendWidth/2.0) ,
		 (height/2.0) - (legendHeight/2.0) ,
		 legendWidth,
		 legendHeight)
    ctx.fillText(mindb.toString() + "db", width/2.0, height/2.0 + legendHeight/2.0 + 3);
    ctx.textBaseline= "bottom";
    ctx.fillText(maxdb.toString() + "db", width/2.0, height/2.0 - legendHeight/2.0 - 3);
    ctx.stroke();
}
