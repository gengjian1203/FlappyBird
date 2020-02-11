import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite {
  constructor() {
    const image = Sprite.getImage('birds');
    super(image, 0, 0, image.width, image.height, DataStore.getInstance().canvas.width / 4, DataStore.getInstance().canvas.height / 2, image.width, image.height);
    this.RealY = this.y;
    this.count = 0;
    this.index = 0;
  }

  draw() {
    this.count++;
    this.index = Math.floor(this.count / 3) % 3;

    const g = 0.98 / 2;
    // 常量为下落之前挣扎的一下
    const offset = (g * (this.count) * (this.count - 30)) / 2;
    this.RealY = this.y + offset;

    super.draw(this.image,
      (this.srcX + this.index * this.srcW / 3), this.srcY,
      (this.srcW / 3), this.srcH,
      this.x, this.RealY,
      (this.width / 3), this.height);
  }
}
