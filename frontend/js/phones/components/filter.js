/* global _:true */

import Component from '../../component.js';

const { debounce } = _;

const QUERY_CHANGE_DELAY = 300;

export default class Filter extends Component {
  constructor({ element, props }) {
    super({ element });

    this._props = { ...props };

    this._render();


    this.on('change', 'order-field', (event) => {
      this.emit('order-changed', event.target.value);
    });

    this.on('input', 'query-field', debounce((event) => {
      this.emit('query-changed', event.target.value);
    }, QUERY_CHANGE_DELAY));
  }

  _updateView() {
    this._render();
  }

  _render() {
    const { query, sortBy } = this._props;

    this._element.innerHTML = `
      <p>
        Search:
        <input data-element="query-field" value="${ query }">
      </p>

      <p>
        Sort by:
        <select data-element="order-field">
          <option
            ${ sortBy === 'name' ? 'selected' : '' }
            value="name"
          >
            Alphabetical
          </option>
          
          <option
            ${ sortBy === 'age' ? 'selected' : '' }
            value="age"
          >
            Newest
          </option>
        </select>
      </p>
    `;
  }
}
