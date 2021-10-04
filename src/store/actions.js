import axios from 'axios';

export default {
  requestAxiosPost({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .post(`${payload.app}${payload.endpoint}`, payload.values, config)
        .then((response) => {
          commit('setData', response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          return false;
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  requestAxiosGet({ commit }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .get(`${payload.app}${payload.endpoint}`, config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          return false;
        });
    });
  },
};
