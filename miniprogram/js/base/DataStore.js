// 数据仓库类
export class DataStore {
  constructor() {
    this.map = new Map();
    // 移动速度
    this.speed = 2;
  }

  put(key, value) {
    if (typeof value === "function") {
      value = new value;
    }
    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }

  destory() {
    for (let value of this.map.values()) {
      value = null;
    }
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
}
