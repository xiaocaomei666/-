/**
 * 小程序订阅发布event class
 */

class WxEvent {
  constructor () {
    this._stores = {}
  }

  on(event, fn, ctx) {
    if (typeof fn != 'function') {
      console.error('fn must be a function')
      return
    }

    (this._stores[event] = this._stores[event] || []).push({
      cb: fn,
      ctx: ctx
    })
  }
  emit(event) {
    let store = this._stores[event]
    let args = []
    if (store) {
      store = store.slice(0)
      args = [].slice.call(arguments, 1)
      for (let i = 0, len = store.length; i < len; i++) {
        store[i].cb.apply(store[i].ctx, args)
      }
    }
  }
  off(event, fn) {
    // all
    if (!arguments.length) {
      this._stores = {}
      return
    }
    // specific event
    let store = this._stores[event]
    if (!store) return
    // remove all handlers
    if (arguments.length === 1) {
      delete this._stores[event]
      return
    }
    // remove specific handler
    let cb
    for (let i = 0, len = store.length; i < len; i++) {
      cb = store[i].cb
      if (cb === fn) {
        store.splice(i, 1)
        break
      }
    }
    return
  }
}

export default WxEvent
