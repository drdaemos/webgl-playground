import vertexShader from './shaders/vertex-basic.glsl';
import fragmentShader from './shaders/fragment-basic.glsl';
import Canvas from './environment/Canvas';
import WebglContext from './environment/WebglContext';
import WebglRenderer from './renderers/WebglRenderer';
import TestObject from './objects/TestObject';

export default class GLEngine {
  constructor() {
    console.log('constructed');
    this.run();
  }

  run() {
    this.canvas = new Canvas();
    WebglContext.instance = WebGLDebugUtils.makeDebugContext(this.canvas.getElement().getContext("webgl"), undefined, this.logGLCall);

    if (!WebglContext.instance) {
        console.log('no WebGL available');
    }

    var renderer = new WebglRenderer({});
    var object = new TestObject();

    renderer.clearCanvas();
    renderer.render(object);
  }

  logGLCall(functionName, args) {   
     console.log("gl." + functionName + "(" + 
        WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");   
  } 
}