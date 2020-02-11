import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Sprite {
  constructor() {
    const image = Sprite.getImage('land');
    super(image, 0, 0, image.width, image.height, 0, DataStore.getInstance().canvas.height - image.height, image.width, image.height);

    this.LandX = 0;
  }

  draw() {
    this.LandX += Sprite.getSpeed();
    if (this.LandX > this.image.width - DataStore.getInstance().canvas.width) {
      this.LandX = 0;
    }
    super.draw(this.image, this.srcX, this.srcY, this.srcW, this.srcH, this.x - this.LandX, this.y, this.width, this.height);
  }
}
