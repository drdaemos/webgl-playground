import Shader from './Shader';
import source from './vertex-basic.glsl';
import WebglContext from '../environment/WebglContext';

export default class VertexShaderBasic extends Shader {    
    constructor() {
        super(WebglContext.instance.VERTEX_SHADER);
    }
    
    getSource() {
        return source;
    }
}