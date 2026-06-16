class EventEmitter {
  subscribers = new Map();

  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (!this.subscribers.get(eventName)) {
      this.subscribers.set(eventName, [])
    }
    this.subscribers.get(eventName).push(callback)
    return {
      unsubscribe: () => {
        const callbacks = this.subscribers.get(eventName)
        const index = callbacks.indexOf(callback)
        if (index === -1) {
          return
        }
        this.subscribers.get(eventName).splice(index, 1)
      }
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const callbacks = this.subscribers.get(eventName)

    return callbacks?.map(c => c(...args)) || []
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
