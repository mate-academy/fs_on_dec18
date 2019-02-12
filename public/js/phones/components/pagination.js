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
  }

  _setPage(page) {
    this._state = {
      ...this._state,

      currentPage: Math.min(
        Math.max(page, 1),
        this.pagesCount,
      ),
    };

    this._render();
  }

  _render() {
    const { currentPage } = this._state;

    this._element.innerHTML = `
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
