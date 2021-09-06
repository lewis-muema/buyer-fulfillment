// import axios from 'axios';

// export default {
//   // payload = {
//   //   app: 'NODE_PRIVATE_API',
//   //   endpoint: 'sign_in',
//   //   values: '',
//   // }
//   requestAxiosPost({ state }, payload) {
//     const baseUrl = window.location.origin;
//     const url = process.env;
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };
//     return new Promise((resolve, reject) => {
//       axios
//         .post(`${url}${payload.endpoint}`, payload.values, config)
//         .then((response) => {
//           resolve(response);
//         })
//         .catch((error) => {
//           if (error.response.status === 403 || error.response.status === 401) {
//             const data = {
//               access_token: localStorage.getItem('jwtToken'),
//               refresh_token: localStorage.getItem('refreshToken'),
//             };
//             axios
//               .post(`${state.ENV.AUTH}token`, data)
//               .then((response) => {
//                 if (response.status === 200) {
//                   localStorage.setItem('jwtToken', response.data);
//                 } else {
//                   localStorage.removeItem('_sessionSnack');
//                   localStorage.removeItem('jwtToken');
//                   window.location.href = loginUrl;
//                 }
//               })
//               .catch(() => {
//                 localStorage.removeItem('_sessionSnack');
//                 localStorage.removeItem('jwtToken');
//                 window.location.href = loginUrl;
//               });
//             return true;
//           }
//           reject(error);
//           return false;
//         });
//     });
//   },
// };
