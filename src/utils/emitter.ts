type Event = string
type EmitterFn = (...args: MediaStream[]) => void
type EventsMap = { [key: Event]: EmitterFn[] }

export class Emitter {
  private readonly events: EventsMap

  constructor() {
    this.events = {}
  }

  emit(e: Event, ...args: MediaStream[]) {
    if (this.events[e]) {
      this.events[e].forEach((fn) => fn(...args))
    }

    return this
  }

  on(e: Event, fn: EmitterFn) {
    this.events[e] ? this.events[e].push(fn) : (this.events[e] = [fn])

    return this
  }

  off(e?: Event, fn?: EmitterFn) {
    if (e && typeof fn === 'function') {
      const listeners = this.events[e]
      listeners.splice(
        listeners.findIndex((_fn) => _fn === fn),
        1,
      )
    }

    if (typeof e === 'string') this.events[e] = []

    return this
  }
}

export default Emitter
