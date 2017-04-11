import WebglContext from '../environment/WebglContext';

export default class Shader {
    constructor(type) {
        this.context = WebglContext.instance;
        this.type = type;
        this.object = this.compile();
    }

    getSource() {
        // Implement in subclasses
        return null;
    }

    getGlObject() {
        return this.object;
    }

    /* Private section */

    compile() {
        var shader = this.context.createShader(this.type);
        this.context.shaderSource(shader, this.getSource());
        this.context.compileShader(shader);
        var success = this.context.getShaderParameter(shader, this.context.COMPILE_STATUS);

        if (success) {
          return shader;
        }
       
        console.log(this.context.getShaderInfoLog(shader));
        this.context.deleteShader(shader);
    }
}