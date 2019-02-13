/* Global Math:true */

import Component from '../component.js';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import Filter from './components/filter.js';
import ShoppingCart from './components/shopping-cart.js';
import Pagination from './components/pagination.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage extends Component {
  constructor({ element }) {
    super({ element });

    this._state = {
      currentPhone: null,
      phones: [],

      currentPage: 1,
      perPage: 5,

      query: '',
      sortBy: 'age',
    };

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
    this._initPagination();

    this._showPhones();
  }

  get pagesCount() {
    const { perPage, phones } = this._state;

    return Math.ceil(phones.length / perPage);
  }

  _setPage(page) {
    const newPage = Math.min(
      Math.max(1, page), this.pagesCount,
    );

    this.setState({
      currentPage: newPage
    });

    this._render();
  }

  _setPerPage(perPage) {
    this._state = {
      ...this._state,
      perPage,
    };

    this._render();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getById(phoneId)
        .catch(() => null);

      if (!phoneDetails) {
        return;
      }

      this._setState({
        currentPhone: phoneDetails,
      });
    });

    this._catalog.subscribe('phone-added', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._setState({
        currentPhone: null,
      });
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initShoppingCart() {
    this._cart = new ShoppingCart({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new Filter({
      element: document.querySelector('[data-component="filter"]'),
      props: {
        query: this._state.query,
        sortBy: this._state.sortBy,
      },
    });

    this._filter.subscribe('order-changed', (sortBy) => {
      this._setState({ sortBy });
    });

    this._filter.subscribe('query-changed', (query) => {
      this._setState({ query });
    });
  }

  _initPagination() {
    this._topPagination = new Pagination({
      element: document.querySelector('[data-component="pagination1"]'),
      props: {
        perPage: this._state.perPage,
        currentPage: this._state.currentPage,
        pagesCount: this.pagesCount,
      },
    });

    this._topPagination.subscribe('page-changed', (currentPage) => {
      this._setState({ currentPage });
    });

    this._topPagination.subscribe('per-page-changed', (perPage) => {
      this._setState({ perPage });
    });

    this._bottomPagination = new Pagination({
      element: document.querySelector('[data-component="pagination2"]'),
      props: {
        perPage: this._state.perPage,
        currentPage: this._state.currentPage,
        pagesCount: this.pagesCount,
      },
    });
  }

  async _showPhones() {
    const { query, sortBy } = this._state;
    const phones = await PhoneService.getAll({ query, sortBy });

    this._setState({
      phones,
      currentPage: 1,
    });
  }

  _updateView() {
    const {
      phones,
      currentPage,
      perPage,
      currentPhone,
      query,
      sortBy,
    } = this._state;

    const paginationProps = {
      pagesCount: this.pagesCount,
      currentPage,
      perPage,
    };

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const visiblePhones = phones.slice(startIndex, endIndex);

    if (currentPhone) {
      this._viewer.show(currentPhone);
      this._catalog.hide();
    } else {
      this._viewer.hide();
      this._catalog.show(visiblePhones);
    }

    this._topPagination.setProps(paginationProps);
    this._bottomPagination.setProps(paginationProps);

    this._filter.setProps({ query, sortBy });
  }

  _render() {
    this._element.innerHTML = `
      <div class="row">

        <!--Sidebar-->
        <div class="col-md-2" data-element="sidebar">
          <section>
            <div data-component="filter"></div>
          </section>
    
          <section>
            <div data-component="shopping-cart"></div>
          </section>
        </div>
    
        <!--Main content-->
        <div class="col-md-10">
          <div data-component="pagination1"></div>
          <div data-component="pagination2"></div>
          <div data-component="phone-catalog"></div>
        </div>
        
        <div data-component="phone-viewer" hidden></div>
      </div>
    `;
  }
}
