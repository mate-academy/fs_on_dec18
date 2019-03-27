import Component from '../../component.js';

export default class Pagination extends Component {
  constructor({ element, props }) {
    super({ element });

    this._props = { ...props };

    this._render();

    this._addEventListeners();
  }

  get pages() {
    const pages = [];
    const { pagesCount } = this._props;

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  _updateView() {
    this._render();
  }

  _addEventListeners() {
    this.on('click', 'page-button', ({ target }) => {
      this._setPage(target.dataset.page);
    });

    this.on('click', 'prev-button', () => {
      this._setPage(this._state.currentPage - 1);
    });

    this.on('click', 'next-button', () => {
      this._setPage(this._state.currentPage + 1);
    });

    this.on('change', 'per-page-select', ({ target }) => {
      const perPage = +target.value;
      this._setPerPage(perPage);
    });
  }

  _setPage(page) {
    const { pagesCount } = this._props;
    const correctPage = Math.min(
      Math.max(1, page), pagesCount,
    );

    this.emit('page-changed', correctPage);
  }

  _setPerPage(perPage) {
    this.emit('per-page-changed', perPage);
  }

  _render() {
    const { currentPage, perPage } = this._props;

    this._element.innerHTML = `
      perPage: ${ perPage }

      <select data-element="per-page-select">
        ${ [3, 5, 10, 20].map(option => `
          <option
            value="${ option }"
            ${ +option === perPage ? 'selected' : '' }
          >
            ${ option }
          </option>
        `).join('') }
        <option></option>
      </select>

      <button data-element="prev-button"> < </button>
      
      ${ this.pages.map(page => `
        <button
          data-element="page-button"
          data-page="${ page }"
          ${ (page === currentPage) ? 'class="pagination__page-button--current"' : '' }
        >
          ${ page }
        </button>
      `).join('')}
      
      <button data-element="next-button"> > </button>
    `;
  }
}
