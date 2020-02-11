// 分数显示器
import {DataStore} from "../base/DataStore.js";

export class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx;
    this.scoreNum = 0;
    this.isScore = true;
  }

  draw() {
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = '#6ea9ff';
    this.ctx.fillText(this.scoreNum, DataStore.getInstance().canvas.width / 2, DataStore.getInstance().canvas.height / 18, 1000);
  }
}
