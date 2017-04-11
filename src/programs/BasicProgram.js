import WebglContext from '../environment/WebglContext';
import Program from '../programs/Program';
import VertexShaderBasic from '../shaders/VertexShaderBasic';
import FragmentShaderBasic from '../shaders/FragmentShaderBasic';

export default class BasicProgram extends Program {
    constructor() {
        var vertex = new VertexShaderBasic();
        var fragment = new FragmentShaderBasic();
        super(vertex, fragment);
    }

    getAttribKeys() {
        return ['a_position', 'a_vertex_color'];
    }

    getPositionLocation() {
        return this.getAttribLocations()['a_position'];
    }

    getVertexColorLocation() {
        return this.getAttribLocations()['a_vertex_color'];
    }
}