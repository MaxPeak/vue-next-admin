/**
 * 事件类
 */
class Events {
  storage: Map<string, Set<() => void>>;
  constructor() {
    this.storage = new Map();
  }
  /**
   * 绑定事件
   */
  on(type: string, callback: () => void) {
    if (this.storage.has(type)) {
      this.storage.get(type)?.add(callback);
    } else {
      const set = new Set<() => void>();
      set.add(callback);
      this.storage.set(type, set);
    }
    return this;
  }
  /**
   * 解绑事件
   */
  off(type: string, callback: () => void) {
    const event = this.storage.get(type);
    event?.forEach(item => {
      if (item !== callback) return;
      event.delete(callback);
    });
  }
  /**
   * 解绑所有事件
   */
  offAll(type: string) {
    this.storage.delete(type);
  }
  /**
   * 触发事件
   */
  emit(type: string, ...rest: []) {
    this.storage.get(type)?.forEach(callback => {
      callback.apply(this, rest);
    });
  }
}

export const emitter = new Events();
