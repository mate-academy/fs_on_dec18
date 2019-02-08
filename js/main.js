import PhonesPage from './phones/phones-page.js';
let currentPage = new PhonesPage({
  element: document.querySelector('[data-page-container]')
});

//
//
//
//
//
// Promise.resolve(1)
//   .then(data1 => {
//     console.log('Succes', data1);
//     throw 2;
//   })
//   .catch(error => {
//     console.log('error', error);
//     throw 3;
//   })
//   .finally(() => console.log('finally'));
//
//
// new Datatable({
//   data: [
//     { name: 'asdasd', age: 12, snippet: 'asd', id: 'asdasd'}
//
//   ],
//
//   columnConfig: {
//     name: {
//       title: 'Название',
//       isSortable: true,
//       isSearchable: true,
//     },
//     age: {
//       title: 'Год выпуска',
//       isSortable: true,
//       isSearchable: true,
//     },
//   }
// });
