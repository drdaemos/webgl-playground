import WebglContext from '../environment/WebglContext';

export default class Program {
    constructor(vertex, fragment) {
        this.context = WebglContext.instance;
        this.vertex = vertex;
        this.fragment = fragment;
        this.object = this.compile();
    }

    getGlObject() {
        return this.object;
    }

    getAttribKeys() {
        return [];
    }

    getAttribLocations() {
        return this.getAttribKeys().reduce((locations, attrKey) => {
            locations[attrKey] = this.context.getAttribLocation(this.object, attrKey);
            return locations;
        }, {});
    }

    enableAttribArrays() {
        var locations = this.getAttribLocations();
        for (var key in locations) {
            this.context.enableVertexAttribArray(locations[key]);
        }
    }

    getPositionLocation() {
        return null;
    }

    getVertexColorLocation() {
        return null;
    }

    /* Private section */

    compile() {
        var program = this.context.createProgram();
        this.context.attachShader(program, this.vertex.getGlObject());
        this.context.attachShader(program, this.fragment.getGlObject());
        this.context.linkProgram(program);
        var success = this.context.getProgramParameter(program, this.context.LINK_STATUS);

        if (success) {
            return program;
        }
       
        console.log(this.context.getProgramInfoLog(program));
        this.context.deleteProgram(program);
    }
}