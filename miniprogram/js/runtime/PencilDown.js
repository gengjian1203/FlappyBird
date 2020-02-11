import {Pencil} from "./Pencil.js";

export class PencilDown extends Pencil{
  constructor(top) {
    const image = Pencil.getImage('pencilDown');
    super(image, top);
  }

  draw() {
    this.y = this.top + Pencil.getGap();
    super.draw();
  }
}
