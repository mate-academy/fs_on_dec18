const PhoneService = {
  getAll({ query = '', sortBy = '' } = {}) {
    let xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json',
      false
    );

    xhr.send();

    if (xhr.status !== 200) {
      console.log(`${ xhr.status } ${ xhr.statusText }`);
      return [];
    }

    const phonesFromServer = JSON.parse(xhr.responseText);

    const filteredPhones = this._filter(phonesFromServer, query);
    const sortedPhones = this._sortBy(filteredPhones, sortBy);

    return sortedPhones;
  },

  getById(phoneId, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      `https://mate-academy.github.io/phone-catalogue-static/phones/${ phoneId }.json`,
      true
    );

    xhr.send();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log(`${ xhr.status } ${ xhr.statusText }`);
        return {};
      }

      const phoneDetails = JSON.parse(xhr.responseText);

      callback(phoneDetails);
    };
  },


  _filter(phones, query) {
    return phones.filter((phone) => phone.name.includes(query));
  },

  _sortBy(phones, sortBy) {
    return phones.sort();
  }
};

export default PhoneService;
