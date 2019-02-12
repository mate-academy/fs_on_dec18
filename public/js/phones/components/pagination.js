export default class Pagination {
  constructor({ element }) {
    this._element = element;

    this._props = {
      totalCount: 0,
    };

    this._state = {
      currentPage: 1,
      perPage: 5,
    };

    this._render();
  }

  setTotalCount(totalCount) {
    this._props = {
      ...this._props,
      totalCount,
    };

    this._render();
  }

  _getPages(pagesCount) {
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return pages;
  }

  _render() {
    const { totalCount } = this._props;
    const { currentPage, perPage } = this._state;

    const pagesCount = Math.ceil(totalCount / perPage);
    const pages = this._getPages(pagesCount);

    this._element.innerHTML = `
      <button> < </button>
      
      ${ pages.map(page => `
        <button>${ page }</button>
      `).join('')}
      
      <button> > </button>
    `;
  }
}
