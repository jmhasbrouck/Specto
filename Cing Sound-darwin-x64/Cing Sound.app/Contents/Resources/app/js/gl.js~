"use strict";

var gl;

var vertexShaderSource =
    "attribute vec2 a_coords;\n" +
    "attribute vec2 a_texCoords;\n" +
    "varying vec2 v_texCoords;\n" +
    "void main() {\n" +
    "   v_texCoords = a_texCoords;\n" +
    "   gl_Position = vec4(a_coords, 0.0, 1.0);\n" +
    "}\n";

var fragmentShaderSource =
    "precision mediump float;\n" +
    "uniform sampler2D u_texture;\n" +
    "varying vec2 v_texCoords;\n" +
    "void main() {\n" +
    "   vec2 pos = v_texCoords;\n" +
    "   vec4 color = texture2D( u_texture, pos );\n" + 
    "   gl_FragColor = vec4(color.xyz, 1.0);\n" +
    "}\n";

var a_coords_location;
var a_coords_buffer;
var a_texCoords_location;
var a_texCoords_buffer;
var u_texture_location;
var u_scale_location;
var textureObject;    
var coords = new Float32Array( [ -1,-1, 1,-1, 1,1, -1,-1, -1,1, 1,1] );
var texCoords = new Float32Array( [ 0,0, 0,1, 1,1, 0,0, 1,0, 1,1] );

/**
 *  Draws the content of the canvas.
 */
function glDraw() {

    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT);  // clear the canvas
   
    gl.bindBuffer(gl.ARRAY_BUFFER, a_coords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_coords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_coords_location); 

    gl.bindBuffer(gl.ARRAY_BUFFER, a_texCoords_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STREAM_DRAW);
    gl.vertexAttribPointer(a_texCoords_location, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_texCoords_location);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.uniform1i( u_texture_location, 0 );
    //gl.uniform1f( u_scale_location, scale);
    /* Draw the triangle. */
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);

}

/**
 * Creates a program for use in the WebGL context gl, and returns the
 * identifier for that program.  If an error occurs while compiling or
 * linking the program, an exception of type String is thrown.  The error
 * string contains the compilation or linking error.  If no error occurs,
 * the program identifier is the return value of the function.
 */
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vsh = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( vsh, vertexShaderSource );
    gl.compileShader( vsh );
    if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
	throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
    }
    var fsh = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fsh, fragmentShaderSource );
    gl.compileShader( fsh );
    if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
	throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
    }
    var prog = gl.createProgram();
    gl.attachShader( prog, vsh );
    gl.attachShader( prog, fsh );
    gl.linkProgram( prog );
    if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
	throw "Link error in program:  " + gl.getProgramInfoLog(prog);
    }
    return prog;
}

function loadTexture() {
    // loading the data into the texture object.
    var width;
    gl.bindTexture(gl.TEXTURE_2D, textureObject);
    width = glWidth;//glWidth > data.length / 3 / numberOfBins ? data.length / 3 / numberOfBins : glWidth;
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB, glHeight , width, 0,gl.RGB,gl.UNSIGNED_BYTE, data);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

}

/**
 * Initialize the WebGL graphics context
 */
function initGL() {
    gl.viewport(0,0,glWidth, glHeight);
    var prog = createProgram( gl, vertexShaderSource, fragmentShaderSource );
    gl.useProgram(prog);
    /* Get the locations for the attribute and uniform variables in the shader, and create VBOs to hold the attribute values. */
    
    a_coords_location = gl.getAttribLocation(prog, "a_coords");

    a_coords_buffer = gl.createBuffer();
    a_texCoords_location = gl.getAttribLocation(prog, "a_texCoords");
    a_texCoords_buffer = gl.createBuffer();
    console.log("a texcoords " + a_texCoords_location);
    u_texture_location = gl.getUniformLocation(prog, "u_texture");
    //u_scale_location = gl.getUniformLocation(prog, "u_scale");
    textureObject = gl.createTexture();
}

/**
 * Initialize the program.  This function is called after the page has been loaded.
 */
function glInit() {
    try {
	var options = {  // no need for alpha channel or depth buffer in this program
	    alpha: false, depth: false
	};
	gl = canvas.getContext("webgl", options) || 
	    canvas.getContext("experimental-webgl", options);
	if ( ! gl ) {
	    throw "Browser does not support WebGL";
	}
    }
    catch (e) {
	console.log("Sorry, could not get a WebGL graphics context" + e);
	return;
    }
    try {
	initGL();  // initialize the WebGL graphics context
    }
    catch (e) {
	console.log("Sorry, could not initialize the WebGL graphics context:" + e);
	return;
    }
}

