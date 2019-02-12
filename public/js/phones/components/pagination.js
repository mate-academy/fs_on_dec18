import Component from '../../component.js';

export default class Pagination extends Component {
  constructor({ element }) {
    super({ element });

    this._props = {
      totalCount: 0,
    };

    this._state = {
      currentPage: 1,
      perPage: 5,
    };

    this._render();

    this._addEventListeners();
  }

  setTotalCount(totalCount) {
    this._props = {
      ...this._props,
      totalCount,
    };

    this._render();
  }

  get pages() {
    const pages = [];
    const pagesCount = this.pagesCount;

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  get pagesCount() {
    const { totalCount } = this._props;
    const { perPage } = this._state;

    return  Math.ceil(totalCount / perPage);
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
    this._state = {
      ...this._state,

      currentPage: Math.min(
        Math.max(1, page), this.pagesCount,
      ),
    };

    this._render();
  }

  _setPerPage(perPage) {
    this._state = {
      ...this._state,
      perPage,
    };

    this._render();
  }

  _render() {
    const { currentPage, perPage } = this._state;

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
