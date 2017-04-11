import WebglContext from '../environment/WebglContext';

export default class RenderingObject {
    constructor () {
        this.context = WebglContext.instance;
    }

    render() {
    }
}