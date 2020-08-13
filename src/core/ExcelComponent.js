import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }
  // Настраиваем наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слушателей про событие
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }
  // подписываемся на событие
  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
  // Сюда приходят изменения только по полям, на которые мы подписались
  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }


  // Инициализируем компонент, добавл Dom слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаляем компонент, чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
