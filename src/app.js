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

    program.positionAttribute = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(program.positionAttribute);

    program.vertexColorAttribute = gl.getAttribLocation(program, "a_vertex_color");
    gl.enableVertexAttribArray(program.vertexColorAttribute);

    return program;
  }

  render(gl, program) {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // three 2d points
    var triangle = [
      -1, -1,
      -1, 1,
      0, 0,
    ];

    var triangleColor = [];
    for (var i = 0; i < 3; i++) {
      triangleColor = triangleColor.concat([0, 0.2, 0.45, 1.0]);
    }

    // three 2d points
    var rectangle = [
      -1, -1,
      -1, 0,
      1, 0,
      1, -1,
    ];

    var rectangleColor = [];
    for (var i = 0; i < 4; i++) {
      rectangleColor = rectangleColor.concat([0.8, 0.1, 0.1, 1.0]);
    }

    var program = this.compileShaders(gl);

    this.drawRectangle(gl, program, rectangle, rectangleColor);
    this.drawTriangle(gl, program, triangle, triangleColor);
  }

  drawTriangle(gl, program, vertices, color)
  {
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    this.bindBuffers(gl, program, vertices, color);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }

  drawRectangle(gl, program, vertices, color) 
  {
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    this.bindBuffers(gl, program, vertices, color);

    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = 4;
    gl.drawArrays(primitiveType, offset, count);
  }

  bindBuffers(gl, program, vertices, color)
  {
    // Bind buffer    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        program.positionAttribute, size, type, normalize, stride, offset);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 4;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        program.vertexColorAttribute, size, type, normalize, stride, offset);
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