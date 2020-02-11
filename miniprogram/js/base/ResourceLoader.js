// 资源加载器
import {Resources} from './Resources.js';

export class ResourceLoader {
  constructor() {
    this.map = new Map(Resources);
    for (let [key, value] of this.map) {
      // const image = new Image();
      const image = wx.createImage();
      image.src = value;
      this.map.set(key, image);
    }
    console.log('ResourceLoader.constructor.');
  }

  onLoadend(callback) {
    let nCount = 0;
    for (let value of this.map.values()) {
      value.onload = () => {
        nCount++;
        if (nCount >= this.map.size) {
          callback(this.map);
        }
      }
    }
  }

  static create() {
    return new ResourceLoader();
  }
}
