import Triangle from '../geometries/2D/Triangle';
import SolidColor from '../materials/SolidColor';
import BasicProgram from '../programs/BasicProgram';
import Mesh from './Mesh';

export default class TestObject extends Mesh {
    constructor() {
        var program = new BasicProgram();
        var vertices = [
          -1, -1,
          -1,  1,
           0,  0,
        ];

        var color = [];
        for (var i = 0; i < 3; i++) {
          color = color.concat([0, 0.2, 0.45, 1.0]);
        }

        var geometry = new Triangle(program, vertices);
        var material = new SolidColor(program, color);
        super(geometry, material, program);
    }
}