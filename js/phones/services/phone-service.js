const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';
// const BASE_URL = 'http://localhost:8080';

const PhoneService = {

  async getAll({ query = '', sortBy = '' } = {}) {
    const url = `${ BASE_URL }/phones/phones.json`;

    return this._sendRequest(url)
      .then((phonesFromServer) => {
        const filteredPhones = this._filter(phonesFromServer, query);
        const sortedPhones = this._sortBy(filteredPhones, sortBy);

        return sortedPhones;
      });

    const phonesFromServer = await this._sendRequest(url);

    const filteredPhones = this._filter(phonesFromServer, query);
    const sortedPhones = this._sortBy(filteredPhones, sortBy);

    return sortedPhones;
  },

  getById(phoneId) {
    const url = `${ BASE_URL }/phones/${phoneId}.json`;

    return this._sendRequest(url);
  },

  _sendRequest(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.warn(error);

        return Promise.reject(error);
      });
  },


  _filter(phones, query) {
    const regexp = new RegExp(query, 'i');

    return phones.filter(phone => regexp.test(phone.name));
  },

  _sortBy(phones, sortBy) {
    return phones.sort();
  }
};

export default PhoneService;
