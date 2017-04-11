import WebglContext from '../environment/WebglContext';
import RenderingObject from './RenderingObject';

export default class Mesh extends RenderingObject {
    constructor(geometry, material, program) {
        super();
        this.geometry = geometry;
        this.material = material;
        this.program = program;
    }

    getGeometry() {
        return this.geometry;
    }

    getMaterial() {
        return this.material;
    }

    getProgram() {
        return this.program;
    }

    render() {      
        this.program.enableAttribArrays();  
        this.context.useProgram(this.program.getGlObject());
        this.geometry.bindBuffer();
        this.material.bindBuffer();

        var offset = 0;
        console.log(this.geometry.getMode(), offset, this.geometry.getBufferSize());
        this.context.drawArrays(this.geometry.getMode(), offset, this.geometry.getBufferSize());
    }
}