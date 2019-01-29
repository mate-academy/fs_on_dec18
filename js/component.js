export default class Component {
  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      let delegateTarget = event.target.closest(`[data-element="${ elementName }"]`);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      callback(event);
    });
  }

  subscribe(eventName, callback) {
    this._callbackMap[eventName] = callback;
  }

  emit(eventName, data) {
    const callback = this._callbackMap[eventName];

    if (!callback) {
      return;
    }

    callback(data);
  }
}
