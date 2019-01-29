import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({
    element,
    phones = [],
    onPhoneSelected = () => {}
  }) {
    super({ element });

    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      let detailsLink = event.target.closest('[data-element="details-link"]');

      if (!detailsLink) {
        return;
      }

      let phoneElement = detailsLink.closest('[data-element="phone"]');

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });

    this.on('click', '[data-element="details-link"]', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });
  }

  on(eventName, selector, callback) {
    this._element.addEventListener(eventName, (event) => {
      let delegateTarget = event.target.closest(selector);

      if (!delegateTarget || !this._element.contains(delegateTarget)) {
        return;
      }

      callback(event);
    })
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li
            data-element="phone"
            data-phone-id="${ phone.id }"
            class="thumbnail"
          >
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
              <a class="btn btn-success">
                Add
              </a>
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
