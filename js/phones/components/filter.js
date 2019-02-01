import Component from '../../component.js';

let debounce = _.debounce;

const QUERY_CHANGE_DELAY = 300;

console.log(debounce);

export default class Filter extends Component {
  constructor({ element }) {
    super({ element });

    this._render();

    this._queryField = this._element.querySelector('[data-element="query-field"]');
    this._orderField = this._element.querySelector('[data-element="order-field"]');

    this.on('change', 'order-field', () => {
      console.log(this._orderField.value);
      this.emit('order-changed', this._orderField.value);
    });

    const emitQueryChangedWithDebounce = debounce(() => {
      console.log(this._queryField.value);
      this.emit('query-changed', this._orderField.value);
    }, QUERY_CHANGE_DELAY);

    this.on('input', 'query-field', emitQueryChangedWithDebounce);
  }

  _render() {
    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="query-field">
      </p>

      <p>
        Sort by:
        <select data-element="order-field">
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </p>
    `;
  }
}
