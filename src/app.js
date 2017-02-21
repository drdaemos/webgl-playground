import vertexShader from './shaders/vertex-basic.glsl';
import fragmentShader from './shaders/fragment-basic.glsl';
import webglUtils from './utils/canvas';

class WebglApp {
  constructor() {
    console.log('constructed');
    this.run();
  }

  run() {
    this.canvas = this.createCanvas();

    this.gl = this.canvas.getContext("webgl");
    if (!this.gl) {
        console.log('no WebGL available');
    }


    var program = this.compileShaders(this.gl);

    this.render(this.gl, program);
  }

  createCanvas() {
    var canvasElement = document.createElement("canvas");
    canvasElement.setAttribute('id', 'main');
    canvasElement.setAttribute('height', '480');
    canvasElement.setAttribute('width', '640');
    // webglUtils.resize(canvasElement);
    var body = document.createElement("body");
    body.appendChild(canvasElement);
    document.querySelector('html').appendChild(body);
    return document.querySelector('#main');
  }

  compileShaders(gl) { 
    var vertex = this.createShader(gl, this.gl.VERTEX_SHADER, vertexShader);
    var fragment = this.createShader(gl, this.gl.FRAGMENT_SHADER, fragmentShader);

    var program = this.createProgram(gl, vertex, fragment);

    return program;
  }

  render(gl, program) {
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // three 2d points
    var positions = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     
    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }

  createProgram(gl, vertex, fragment) {
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

  createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
   
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}

window.app = new WebglApp();

module.exports = WebglApp;