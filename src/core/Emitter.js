export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // dispatch, fire, trigger
  // Уведомл слушателей если они есть
  // table.emit('able-select', {a: 1})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // on, listen ...
  // Подписываемся на уведомления
  // Добавл нового слушателя
  // formula.subscribe('table-select', () => {})
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] =
              this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}
// Example
// const emitter = new Emitter()
//
// const unsub = emitter
//     .subscribe('vladilen', data => console.log('Sub:', data))
//
// emitter.emit('13213246', 42)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After two seconds')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After four seconds')
// }, 4000)
