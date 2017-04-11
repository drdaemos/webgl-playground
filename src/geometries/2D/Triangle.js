import Shape from '../Shape';

export default class Triangle extends Shape {
    getMode() {
        return this.context.TRIANGLES;
    }

    getBufferSize () {
        return 3;
    }

    getVectorSize () {
        return 2;
    }
}