import PhonesPage from './phones/phones-page.js';
let currentPage = new PhonesPage({
  element: document.querySelector('[data-page-container]')
});


//
// Promises
//
// let promise1 = new Promise(
//   (resolve, reject) => {
//
//
//     document.addEventListener('click', () => {
//       console.log('document click');
//
//       resolve(123);
//     });
//
//     setTimeout(() => {
//       console.log('timeout');
//
//       reject(999);
//     }, 5000);
//
//   }
// );
//
//
// promise1
//   .then((data) => {
//     console.log('Success', data);
//   });
//
// promise1
//   .catch((serverError) => {
//     console.log('Error', serverError);
//   });
//
// promise1
//   .then((resposeText) => {
//     console.log('Success', data);
//     JSON.parse(resposeText);
//   })
//   .catch((serverError) => {
//     console.log('Error', serverError);
//   });
//
// promise1
//   .then(
//     (data) => { console.log('Success', data); f() },
//     (serverError) => { console.log('Error', serverError); }
//   );
