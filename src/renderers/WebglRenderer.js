import Renderer from './Renderer';
import WebglContext from '../environment/WebglContext';

export default class WebglRenderer {
    constructor (options) {
        this.context = WebglContext.instance;
        this.initializeContext(options);
    }

    render (object) {
        object.render();
    }

    clearCanvas () {
        this.context.clearColor(0, 0, 0, 0);
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }    

    /* Private section */
    
    initializeContext () {
        this.context.viewport(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
}