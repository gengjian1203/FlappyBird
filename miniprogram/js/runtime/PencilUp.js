import {Pencil} from "./Pencil.js";

export class PencilUp extends Pencil {
  constructor(top) {
    const image = Pencil.getImage('pencilUp');
    super(image, top);
  }

  draw() {
    this.y = this.top - this.height;
    super.draw();
  }
}
