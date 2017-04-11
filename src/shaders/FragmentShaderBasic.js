import Shader from './Shader';
import source from './fragment-basic.glsl';
import WebglContext from '../environment/WebglContext';

export default class FragmentShaderBasic extends Shader {
    constructor() {
        super(WebglContext.instance.FRAGMENT_SHADER);
    }

    getSource() {
        return source;
    }
}