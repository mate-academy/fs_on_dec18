const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';
// const BASE_URL = 'http://localhost:8080';

const PhoneService = {

  getAll({ query = '', sortBy = '' } = {}) {
    return new Promise((resolve, reject) => {
      const url = `${ BASE_URL }/phones/phones.json`;
      const requestPromise = this._sendRequest(url);

      requestPromise
        .then((phonesFromServer) => {
          const filteredPhones = this._filter(phonesFromServer, query);
          const sortedPhones = this._sortBy(filteredPhones, sortBy);

          resolve(sortedPhones);
        })
        .catch((error) => reject(error));
    });
  },

  getById(phoneId) {
    const url = `${ BASE_URL }/phones/${phoneId}.json`;

    return this._sendRequest(url);
  },

  _sendRequest(url) {
    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.send();

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          resolve(data);
        } else {
          reject(`Error`);
        }
      };

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
