import Material from './Material';

export default class SolidColor extends Material {
    getBufferSize () {
        return 3;
    }

    getVectorSize () {
        return 4;
    }
}