/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


// eslint-disable-next-line no-unused-vars
const currentPage = new _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
  element: document.querySelector('[data-page-container]'),
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhonesPage; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _components_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _components_pagination_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _services_phone_service_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* Global Math:true */










class PhonesPage extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

  _initCatalog() {
    this._catalog = new _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      element: document.querySelector('[data-component="phone-catalog"]'),
    });

    this._catalog.subscribe('phone-selected', async (phoneId) => {
      const phoneDetails = await _services_phone_service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getById(phoneId)
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
    this._viewer = new _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      element: document.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('back', () => {
      this._showPhones();
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._cart.add(phoneId);
    });
  }

  _initShoppingCart() {
    this._cart = new _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      element: document.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilter() {
    this._filter = new _components_filter_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
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
    this._topPagination = new _components_pagination_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
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

    this._bottomPagination = new _components_pagination_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
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
    const phones = await _services_phone_service_js__WEBPACK_IMPORTED_MODULE_6__["default"].getAll({ query, sortBy });

    this._setState({
      phones,
      currentPage: 1,
      currentPhone: null,
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });
class Component {
  constructor({ element }) {
    this._element = element;
    this._callbackMap = {};
    this._props = {};
    this._state = {};
  }

  hide() {
    this._element.hidden = true;
  }

  show() {
    this._element.hidden = false;
  }

  on(eventName, elementName, callback) {
    this._element.addEventListener(eventName, (event) => {
      const delegateTarget = event.target.closest(`[data-element="${ elementName }"]`);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      callback(event);
    });
  }

  subscribe(eventName, callback) {
    if (!this._callbackMap[eventName]) {
      this._callbackMap[eventName] = [];
    }

    this._callbackMap[eventName].push(callback);
  }

  emit(eventName, data) {
    const eventCallbacks = this._callbackMap[eventName];

    if (!eventCallbacks) {
      return;
    }

    eventCallbacks.forEach((callback) => {
      callback(data);
    });
  }

  setProps(newProps) {
    this._props = {
      ...this._props,
      ...newProps,
    };

    this._updateView(this._props, this._state);
  }

  _setState(newState) {
    this._state = {
      ...this._state,
      ...newState,
    };

    this._updateView(this._props, this._state);
  }

  _updateView() {
    console.warn('Please implement _updateView');
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneCatalog; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class PhoneCatalog extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._phones = [];

    this._render();

    this.on('click', 'details-link', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-selected', phoneElement.dataset.phoneId);
    });

    this.on('click', 'add-button', (event) => {
      const phoneElement = event.target.closest('[data-element="phone"]');

      this.emit('phone-added', phoneElement.dataset.phoneId);
    });
  }

  show(phones) {
    this._phones = phones;

    super.show();

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li
            data-element="phone"
            data-phone-id="${phone.id}"
            class="thumbnail"
          >
            <span>(#${ phone.age })</span>
            <a
              data-element="details-link"
              href="#!/phones/${ phone.id }"
              class="thumb"
            >
              <img
                alt="${ phone.name }"
                src="${ phone.imageUrl }"
              >
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <button class="btn btn-success" data-element="add-button">
                Add
              </button>
            </div>
  
            <a
              data-element="details-link"
              href="#!/phones/motorola-xoom-with-wi-fi"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        
        `).join('') }
      </ul>
    `;
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneViewer; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class PhoneViewer extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this.on('click', 'back-button', () => {
      this.emit('back');
    });

    this.on('click', 'add-button', () => {
      this.emit('add', this._phoneDetails.id);
    });

    this.on('click', 'small-image', (event) => {
      const smallImage = event.target;
      const largeImage = this._element.querySelector('[data-element="large-image"]');

      largeImage.src = smallImage.src;
    });
  }

  show(phoneDetails) {
    this._phoneDetails = phoneDetails;

    super.show();

    this._render();
  }

  _render() {
    const phone = this._phoneDetails;

    this._element.innerHTML = `
      <img
        data-element="large-image"
        class="phone"
        src="${ phone.images[0] }"
      >

      <button data-element="back-button">
        Back
      </button>
      
      <button data-element="add-button">
        Add to basket
      </button>
  
  
      <h1>${ phone.name }</h1>
      <p>${ phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phone.images.map(imageUrl => `
          <li>
            <img
              data-element="small-image"
              src="${ imageUrl }"
            >                
          </li>
        `).join('') }
      </ul>
    `;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* global _:true */



const { debounce } = _;

const QUERY_CHANGE_DELAY = 300;

class Filter extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShoppingCart; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class ShoppingCart extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor({ element }) {
    super({ element });

    this._itemsMap = {};

    this._render();

    this.on('click', 'remove', (event) => {
      const itemElement = event.target.closest('[data-element="item"]');

      this.remove(itemElement.dataset.itemId);
    });
  }

  add(itemId) {
    if (!(itemId in this._itemsMap)) {
      this._itemsMap[itemId] = 0;
    }

    this._itemsMap[itemId] += 1;

    this._render();
  }

  remove(itemId) {
    if (!(itemId in this._itemsMap)) {
      return;
    }

    this._itemsMap[itemId] -= 1;

    if (this._itemsMap[itemId] === 0) {
      delete this._itemsMap[itemId];
    }

    this._render();
  }

  _render() {
    const itemIds = Object.keys(this._itemsMap);

    this._element.innerHTML = `
        <h4>Shopping Cart</h4>
      
      ${ itemIds.length > 0 ? `
        <ul>
          ${ itemIds.map(itemId => `
            
            <li data-element="item" data-item-id="${ itemId }">
              ${ itemId } (${ this._itemsMap[itemId] })
              <button data-element="remove">-</button>
            </li>
          
          `).join('') }
        </ul>
      ` : `
        <p>No items yet</p>
      ` }
      
    `;
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pagination; });
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Pagination extends _component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';
// const BASE_URL = 'http://localhost:8080';

const PhoneService = {

  async getAll({ query = '', sortBy = '' } = {}) {
    const phonesFromServer = await this._sendRequest('/phones/phones');
    const regexp = new RegExp(query, 'i');

    return phonesFromServer
      .filter(phone => regexp.test(phone.name))
      .sort((a, b) => {
        switch (typeof a[sortBy]) {
          case 'number':
            return a[sortBy] - b[sortBy];

          case 'string':
            return a[sortBy].localeCompare(b[sortBy]);

          default:
            return 1;
        }
      });
  },

  getById(phoneId) {
    return this._sendRequest(`/phones/${ phoneId }`);
  },

  _sendRequest(url) {
    return fetch(`${ BASE_URL }${ url }.json`)
      .then(response => response.json())
      .catch((error) => {
        console.warn(error);

        return Promise.reject(error);
      });
  },
};

/* harmony default export */ __webpack_exports__["default"] = (PhoneService);


/***/ })
/******/ ]);