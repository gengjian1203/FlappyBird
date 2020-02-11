// 导演类
import {DataStore} from "./base/DataStore.js";
import {PencilUp} from "./runtime/PencilUp.js";
import {PencilDown} from "./runtime/PencilDown.js";

export class Director {
  constructor() {
    console.log('Director.constructor.');
    this.data = DataStore.getInstance();
    this.isGameOver = false;
  }

  createPencils() {
    const top = DataStore.getInstance().canvas.height / 8 + Math.random() * (DataStore.getInstance().pencilLimitTop);
    this.data.get('pencils').push(new PencilUp(top));
    this.data.get('pencils').push(new PencilDown(top));
  }

  // 小鸟跳跃
  birdJump() {
    console.log('birdJump');
    const bird = this.data.get('birds');
    if (bird.RealY > 30) {
      bird.y = bird.RealY;
      bird.count = 0;
    }
  }

  // 小鸟铅笔碰撞检测
  static isStrike(bird, pencil) {
    let result = false;
    if ((bird.top > pencil.bottom) ||
        (bird.bottom < pencil.top) ||
        (bird.left > pencil.right) ||
        (bird.right < pencil.left)) {
      // console.log(bird, pencil);
      result = true;
    }
    return !result;
  }

  // 游戏结束检测
  birdCheck() {
    const bird = this.data.get('birds');
    const land = this.data.get('land');
    const pencils = this.data.get('pencils');
    const score = this.data.get('score');

    // 检测地板撞击
    if (bird.RealY + (bird.height - 4) > land.y) {
      console.log('小鸟撞击地板');
      this.isGameOver = true;
      return;
    }

    // 构造模型，检测铅笔撞击
    const birdBorder = {
      top: bird.RealY,
      left: bird.x,
      right: bird.x + bird.width / 3 - 14,
      bottom: bird.RealY + (bird.height - 4)
    };
    for (let value of pencils) {
      const pencilBorder = {
        top: value.y + 6,
        left: value.x,
        right: value.x + value.width,
        bottom: value.y + value.height
      }

      if (Director.isStrike(birdBorder, pencilBorder)) {
        console.log('小鸟撞击铅笔', birdBorder, pencilBorder);
        this.isGameOver = true;
        return;
      }
    }

    // 加分逻辑
    if (score.isScore && (bird.x > pencils[0].x + pencils[0].width)) {
      score.isScore = false;
      score.scoreNum++;
      this.data.speed = 2 + Math.floor(score.scoreNum / 10);
    }
  }

  run() {
    this.birdCheck();
    if (!this.isGameOver) {
      // 销毁视野外的铅笔
      const arrPencils = this.data.get('pencils');
      const score = this.data.get('score');

      if (arrPencils[0] && (arrPencils[0].x + arrPencils[0].width < 0)) {
        arrPencils.shift();
        arrPencils.shift();
        score.isScore = true;
      }
      // 生成铅笔
      if (arrPencils[0] && (arrPencils[0].x + arrPencils[0].width < DataStore.getInstance().canvas.width / 2) && (arrPencils.length === 2)) {
        this.createPencils();
      }

      this.data.get('background').draw();
      this.data.get('pencils').forEach((value) => {
        value.draw();
      })
      this.data.get('score').draw();
      this.data.get('land').draw();
      this.data.get('birds').draw();

      const timer = requestAnimationFrame(() => {
        this.run();
      });

      // setTimeout(() => {
      //   this.run();
      // }, 2000);
      this.data.put('timer', timer);
    } else {
      // 游戏结束
      console.log('游戏结束');
      this.data.get('startButton').draw();
      cancelAnimationFrame(this.data.get('timer'));
      this.data.destory();
    }

  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director();
    }
    return Director.instance;
  }
}
