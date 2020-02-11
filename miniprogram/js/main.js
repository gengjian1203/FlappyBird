import {Director} from "./Director.js";
import {ResourceLoader} from './base/ResourceLoader.js';
import {DataStore} from "./base/DataStore.js";
import {Background} from "./runtime/Background.js";
import {Land} from "./runtime/Land.js";
import {Birds} from "./player/Birds.js";
import {StartButton} from "./player/StartButton.js";
import {Score} from "./player/Score.js";

export class Main {
  constructor() {
    console.log('Hello FlappyBird');
    this.canvas = wx.createCanvas();
    // this.canvas = document.getElementById('game_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.data = DataStore.getInstance();
    this.director = Director.getInstance();

    const loader = ResourceLoader.create();
    loader.onLoadend((map) => {
      this.onResourceFirstLoad(map);
    })
  }

  onResourceFirstLoad(map) {
    // 确认资源加载完毕
    this.data.canvas = this.canvas;
    this.data.ctx = this.ctx;
    this.data.res = map;

    // 铅笔间隙
    this.data.gap = this.canvas.height / 5;
    // 铅笔浮动
    this.data.pencilLimitTop = (this.canvas.height / 2) - (this.canvas.height / 8);
    this.init();
  }

  init() {
    this.data.speed = 2;
    this.data.put('background', Background)
             .put('score', Score)
             .put('land', Land)
             .put('birds', Birds)
             .put('pencils', [])
             .put('startButton', StartButton);
    this.director.isGameOver = false;

    // 注册点击事件
    this.registerEvent();

    this.director.createPencils();
    this.director.run();
  }

  registerEvent() {
    // 浏览器版本
    // this.canvas.addEventListener('touchstart', (e) => {
    //   e.preventDefault();
    //   if (this.director.isGameOver) {
    //     const startButton = this.data.get('startButton');
    //     if ((e.touches[0].pageX > startButton.x) &&
    //       (e.touches[0].pageX < startButton.x + startButton.width) &&
    //       (e.touches[0].pageY > startButton.y) &&
    //       (e.touches[0].pageY < startButton.y + startButton.height)) {
    //       console.log('游戏重新开始');
    //       this.init();
    //     }
    //   } else {
    //     this.director.birdJump();
    //   }
    // });

    // 小游戏版本
    wx.onTouchStart((res) => {
      if (this.director.isGameOver) {
        const startButton = this.data.get('startButton');
        if ((res.touches[0].pageX > startButton.x) &&
          (res.touches[0].pageX < startButton.x + startButton.width) &&
          (res.touches[0].pageY > startButton.y) &&
          (res.touches[0].pageY < startButton.y + startButton.height)) {
          console.log('游戏重新开始');
          this.init();
        }
      } else {
        this.director.birdJump();
      }
    })
  }
}
