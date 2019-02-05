const PhoneService = {
  getAll({ query = '', sortBy = '' } = {}, callback) {
    let url = 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json';

    this._sendRequest(url, (phonesFromServer) => {
      const filteredPhones = this._filter(phonesFromServer, query);
      const sortedPhones = this._sortBy(filteredPhones, sortBy);

      callback(sortedPhones);
    });
  },

  getById(phoneId, callback) {
    let url = `https://mate-academy.github.io/phone-catalogue-static/phones/${phoneId}.json`;

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
