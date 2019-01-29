import Component from '../../component.js';

export default class PhoneViewer extends Component {

  constructor({ element, onBack }) {
    super({ element });

    this._onBack = onBack;

    this._element.addEventListener('click', (event) => {
      const backButton = event.target.closest('[data-element="back-button"]');

      if (!backButton) {
        return;
      }

      this._onBack();
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
      <img class="phone" src="${ phone.images[0] }">

      <button data-element="back-button">
        Back
      </button>
      
      <button>Add to basket</button>
  
  
      <h1>${ phone.name }</h1>
  
      <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
  
      <ul class="phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
  }
}
