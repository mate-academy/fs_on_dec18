const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static';
// const BASE_URL = 'http://localhost:8080';

const PhoneService = {

  getAll({ query = '', sortBy = '' } = {}) {
    return new Promise(
      (resolve, reject) => {

        const url = `${ BASE_URL }/phones/phones.json`;

        const callbackForSendRequest = (phonesFromServer) => {
          const filteredPhones = this._filter(phonesFromServer, query);
          const sortedPhones = this._sortBy(filteredPhones, sortBy);

          resolve(sortedPhones);
        };

        this._sendRequest(url, callbackForSendRequest);
      }
    );
  },

  getById(phoneId, callback) {
    const url = `${ BASE_URL }/phones/${phoneId}.json`;

    this._sendRequest(url, callback);
  },

  _sendRequest(url, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log(`${ xhr.status } ${ xhr.statusText }`);
        return {};
      }

      const data = JSON.parse(xhr.responseText);

      callback(data);
    };
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
