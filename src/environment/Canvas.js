export default class Canvas {
  constructor() {
    this.element = document.createElement("canvas");
    this.mount();
    this.resize();
  }

  getElement() {
    return this.element;
  }

  // Private section
  
  mount() {
    var body = document.querySelector('body');
    body.appendChild(this.element);
  }

  resize() {
    var canvas = this.element;

    var realToCSSPixels = window.devicePixelRatio;

    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
    var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }

  }
}