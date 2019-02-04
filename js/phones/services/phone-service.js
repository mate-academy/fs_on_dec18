const PhoneService = {
  getAll({ query = '', sortBy = '' } = {}) {
    console.log(`Query: ${query}, sortBy ${sortBy} `);


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

  getById(phoneId) {
    return phonesDetails.find(phone => phone.id === phoneId);
  },


  _filter(phones, query) {
    return phones.filter((phone) => phone.name.includes(query));
  },

  _sortBy(phones, sortBy) {
    return phones.sort();
  }
};

export default PhoneService;
