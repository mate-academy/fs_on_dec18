import Component from '../../component.js';

export default class PhoneViewer extends Component {

  constructor({ element, onBack }) {
    super({ element });

    this._onBack = onBack;

    this.on('click', 'back-button', this._onBack);
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
      
      <button>Add to basket</button>
  
  
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
