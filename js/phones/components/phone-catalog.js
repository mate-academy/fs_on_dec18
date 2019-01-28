export default class PhoneCatalog {
  constructor({
    element,
    phones = [],
    onPhoneSelected = () => {}
  }) {
    this._element = element;
    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      let phoneElement = event.target.closest('[data-element="phone"]');

      if (!phoneElement) {
        return;
      }

      this._onPhoneSelected(phoneElement.dataset.phoneId);
    });
  }

  hide() {
    this._element.hidden = true;
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li class="thumbnail" data-element="phone" data-phone-id="${ phone.id }">
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/motorola-xoom-with-wi-fi">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        
        
        `).join('') }
      </ul>
    `;
  }
}
