import WebglContext from '../environment/WebglContext';

export default class Material {
    constructor (program, colors) {
        this.context = WebglContext.instance;
        this.program = program;
        this.colors = colors;
    }

    getVertices() {
        return this.colors;
    }

    getBufferOffset () {
        return 0;
    }

    getBufferSize () {
        return 0;
    }

    getVectorSize () {
        return null;
    }

    bindBuffer() {
        // Bind buffer    
        var buffer = this.context.createBuffer();
        this.context.bindBuffer(this.context.ARRAY_BUFFER, buffer);
        this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(this.getVertices()), this.context.STATIC_DRAW);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = this.getVectorSize();          // 2 components per iteration
        var type = this.context.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        this.context.vertexAttribPointer(
            this.program.getVertexColorLocation(), size, type, normalize, stride, offset);
    }
}