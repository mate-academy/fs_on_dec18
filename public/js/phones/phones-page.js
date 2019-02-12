import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import Filter from './components/filter.js';
import ShoppingCart from './components/shopping-cart.js';
import Pagination from './components/pagination.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilter();
    this._initPagination();

    this._showPhones();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: document.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', (phoneId) => {
      const detailsPromise = PhoneService.getById(phoneId);

      detailsPromise.then((phoneDetails) => {
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      });
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await PhoneService.getById(phoneId)
        .catch(() => null);

      if (!phoneDetails) {
        return;
      }

      this._catalog.hide();
      this._viewer.show(phoneDetails);
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
      this._viewer.hide();
      this._showPhones();
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
    });

    this._filter.subscribe('order-changed', () => {
      this._showPhones();
    });

    this._filter.subscribe('query-changed', () => {
      this._showPhones();
    });
  }

  _initPagination() {
    this._topPagination = new Pagination({
      element: document.querySelector('[data-component="pagination1"]'),
    });
  }

  async _showPhones() {
    const currentFiltering = this._filter.getCurrentData();

    try {
      const phones = await PhoneService.getAll(currentFiltering);

      this._topPagination.setTotalCount(phones.length);
      this._catalog.show(phones);
    } catch (error) {
      alert('Server is not available');
    }
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
          <div data-component="phone-catalog"></div>
        </div>
        
        <div data-component="phone-viewer" hidden></div>
      </div>
    `;
  }
}
